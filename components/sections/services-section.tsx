"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  FileCode, Users, Brain, Cpu, BarChart3, Code2,
  Globe, Smartphone, Radio, Bot, Cloud, LineChart,
  FileText, Linkedin, MessageSquare, Map, Briefcase, TrendingUp
} from "lucide-react"
import type { UserCategory, Service } from "@/lib/types"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileCode, Users, Brain, Cpu, BarChart3, Code2,
  Globe, Smartphone, Radio, Bot, Cloud, LineChart,
  FileText, Linkedin, MessageSquare, Map, Briefcase, TrendingUp
}

interface ServicesSectionProps {
  category: UserCategory
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

type FetchedService = Service & { id: number | string }

export default function ServicesSection({ category }: ServicesSectionProps) {
  const [services, setServices] = useState<FetchedService[]>([])

  useEffect(() => {
    let cancelled = false
    const params = new URLSearchParams({
      'where[category][equals]': category,
      sort: 'createdAt',
      limit: '100',
    })

    fetch(`/api/services?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load services: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setServices(data.docs ?? [])
      })
      .catch((error) => {
        console.error(error)
      })

    return () => {
      cancelled = true
    }
  }, [category])

  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px]"
        style={{
          background: 'radial-gradient(ellipse at center, oklch(0.75 0.15 180 / 0.05) 0%, transparent 60%)'
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
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Our Services</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            What We <span className="text-gradient-accent">Offer</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions tailored to your specific needs and goals.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || FileCode
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group relative p-6 md:p-8 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-500"
                whileHover={{ y: -4 }}
              >
                {/* Gradient on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                {/* Number indicator */}
                <div className="absolute top-6 right-6 text-6xl font-bold text-muted/5 group-hover:text-primary/10 transition-colors duration-500">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
