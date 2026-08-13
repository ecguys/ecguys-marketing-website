"use client"

import { useState, useEffect, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import HeroAnimation from "@/components/hero-animation"
import SelectionScreen from "@/components/selection-screen"
import Dashboard from "@/components/dashboard"
import type { UserCategory } from "@/lib/types"

type AppState = "animation" | "selection" | "dashboard"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("animation")
  const [category, setCategory] = useState<UserCategory | null>(null)

  // Check for persisted category on mount
  useEffect(() => {
    const savedCategory = localStorage.getItem("ecguys-category") as UserCategory | null
    if (savedCategory) {
      setCategory(savedCategory)
      setAppState("dashboard")
    }
  }, [])

  const handleAnimationComplete = useCallback(() => {
    setAppState("selection")
  }, [])

  const handleCategorySelect = (selectedCategory: UserCategory) => {
    setCategory(selectedCategory)
    localStorage.setItem("ecguys-category", selectedCategory)
    setAppState("dashboard")
  }

  const handleReset = () => {
    localStorage.removeItem("ecguys-category")
    setCategory(null)
    setAppState("selection")
  }

  return (
    <AnimatePresence mode="wait">
      {appState === "animation" && (
        <motion.div
          key="animation"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroAnimation onComplete={handleAnimationComplete} />
        </motion.div>
      )}

      {appState === "selection" && (
        <motion.div
          key="selection"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <SelectionScreen onSelect={handleCategorySelect} />
        </motion.div>
      )}

      {appState === "dashboard" && category && (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Dashboard category={category} onReset={handleReset} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
