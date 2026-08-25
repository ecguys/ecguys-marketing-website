"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import type { UserCategory, Testimonial } from "@/lib/types"

interface TestimonialsSectionProps {
  category: UserCategory
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

type FetchedTestimonial = Testimonial & { id: number | string }

export default function TestimonialsSection({ category }: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState<FetchedTestimonial[]>([])

  useEffect(() => {
    let cancelled = false
    const params = new URLSearchParams({
      'where[category][equals]': category,
      sort: 'createdAt',
      limit: '100',
    })

    fetch(`/api/testimonials?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load testimonials: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setTestimonials(data.docs ?? [])
      })
      .catch((error) => {
        console.error(error)
      })

    return () => {
      cancelled = true
    }
  }, [category])

  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]"
        style={{
          background: 'radial-gradient(ellipse at center, oklch(0.65 0.15 280 / 0.05) 0%, transparent 50%)'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-chart-3" />
            <span className="text-sm text-muted-foreground">Testimonials</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Trusted by <span className="text-gradient-accent">Leaders</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our clients say about working with ECGuys.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="group relative p-6 md:p-8 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-500"
              whileHover={{ y: -4 }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6">
                <Quote className="w-8 h-8 text-primary/20 group-hover:text-primary/40 transition-colors duration-300" />
              </div>
              
              {/* Content */}
              <p className="text-muted-foreground leading-relaxed mb-6 pr-8">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary-foreground">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.company}
                  </div>
                </div>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
