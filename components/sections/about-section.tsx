"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Globe2, Award, Users } from "lucide-react"

const achievements = [
  { icon: Globe2, title: "Global Presence", description: "Serving clients across India, Ireland, UK, and Gulf countries" },
  { icon: Award, title: "4+ Years Experience", description: "Proven track record of excellence and client satisfaction" },
  { icon: Users, title: "Expert Team", description: "Specialists in electronics, computer science, and business consulting" },
]

const highlights = [
  "Diploma, Bachelor's, and Master's expertise in Electronics & CS",
  "Partnership with UK-based companies",
  "Cross-functional team covering diverse technical domains",
  "Personalized approach for every client",
]

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div 
        className="absolute bottom-0 left-1/4 w-[600px] h-[400px]"
        style={{
          background: 'radial-gradient(ellipse at center, oklch(0.72 0.18 45 / 0.05) 0%, transparent 60%)'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">Our Story</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Built by <span className="text-gradient-accent">Experts</span>, for Excellence
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              ECGuys was founded by <span className="text-foreground font-medium">Abhi</span>, who began by helping students with projects and programming. 
              What started as a passion for teaching evolved into a global consulting firm, partnering with 
              <span className="text-foreground font-medium"> Biphi</span> and <span className="text-foreground font-medium">Bazil</span>—each bringing unique technical expertise.
            </p>
            
            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Achievement Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <motion.div
                  key={achievement.title}
                  className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ x: 8 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                        {achievement.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Decorative element */}
            <motion.div
              className="relative p-6 rounded-2xl gradient-border overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              <div className="relative text-center">
                <div className="text-4xl font-bold text-gradient mb-2">500+</div>
                <div className="text-muted-foreground text-sm">Projects Successfully Delivered</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
