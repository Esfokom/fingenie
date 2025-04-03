"use client"

import { motion } from "framer-motion"

export default function TeamHero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 hero-gradient -z-10" />
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Meet Our <span className="gradient-text">Team</span>
          </motion.h1>
          <motion.p
            className="mt-4 text-muted-foreground md:text-xl/relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The talented students from Kwame Nkrumah University of Science and Technology who brought FinGenie to life
          </motion.p>
        </div>
      </div>
    </section>
  )
}

