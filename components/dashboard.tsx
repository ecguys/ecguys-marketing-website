"use client"

import { motion } from "framer-motion"
import type { UserCategory } from "@/lib/types"
import Navigation from "./navigation"
import HeroSection from "./sections/hero-section"
import ServicesSection from "./sections/services-section"
import AboutSection from "./sections/about-section"
import TestimonialsSection from "./sections/testimonials-section"
import ContactSection from "./sections/contact-section"
import Footer from "./footer"

interface DashboardProps {
  category: UserCategory
  onReset: () => void
}

export default function Dashboard({ category, onReset }: DashboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Navigation category={category} onReset={onReset} />
      <main>
        <HeroSection category={category} />
        <ServicesSection category={category} />
        <AboutSection />
        <TestimonialsSection category={category} />
        <ContactSection category={category} />
      </main>
      <Footer />
    </motion.div>
  )
}
