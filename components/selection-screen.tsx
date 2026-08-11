"use client"

import { motion } from "framer-motion"
import { GraduationCap, Briefcase, Rocket, ArrowRight } from "lucide-react"
import type { UserCategory } from "@/lib/types"

interface SelectionScreenProps {
  onSelect: (category: UserCategory) => void
}

const categories = [
  {
    id: "student" as UserCategory,
    title: "Student Help",
    description: "Project assistance, tutoring, AI/IoT learning, and academic support for school to masters level.",
    icon: GraduationCap,
    gradient: "from-primary/20 to-primary/5",
    borderGlow: "group-hover:shadow-[0_0_40px_oklch(0.75_0.15_180_/_0.3)]",
  },
  {
    id: "business" as UserCategory,
    title: "Business Solutions",
    description: "Web & mobile apps, IoT systems, AI automation, and enterprise consulting for your business.",
    icon: Briefcase,
    gradient: "from-accent/20 to-accent/5",
    borderGlow: "group-hover:shadow-[0_0_40px_oklch(0.72_0.18_45_/_0.3)]",
  },
  {
    id: "career" as UserCategory,
    title: "Career Mentoring",
    description: "CV optimization, LinkedIn enhancement, job guidance, and interview preparation worldwide.",
    icon: Rocket,
    gradient: "from-chart-3/20 to-chart-3/5",
    borderGlow: "group-hover:shadow-[0_0_40px_oklch(0.65_0.15_280_/_0.3)]",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function SelectionScreen({ onSelect }: SelectionScreenProps) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
        style={{
          background: 'radial-gradient(ellipse at center, oklch(0.75 0.15 180 / 0.06) 0%, transparent 60%)'
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 min-h-screen flex flex-col justify-center">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Welcome to </span>
            <code className="text-sm font-mono text-primary">&lt;/ECGUYS&gt;</code>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
            What are you{" "}
            <span className="text-gradient-accent">looking for?</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Choose your path to get a personalized experience tailored to your needs.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <motion.button
                key={category.id}
                variants={itemVariants}
                onClick={() => onSelect(category.id)}
                className={`group relative p-8 rounded-2xl text-left transition-all duration-500 
                  bg-card/50 border border-border hover:border-primary/50
                  ${category.borderGlow} cursor-pointer`}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    <span>Get started</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute -inset-full top-0 h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:animate-shine" />
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Footer note */}
        <motion.p 
          className="text-center mt-16 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Serving clients across India, Ireland, UK, and Gulf countries for over 4 years.
        </motion.p>
      </div>
    </div>
  )
}
