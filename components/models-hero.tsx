"use client"

import { motion } from "framer-motion"
import { Brain, Database } from "lucide-react"

export default function ModelsHero() {
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
            Our AI <span className="gradient-text">Models</span>
          </motion.h1>
          <motion.p
            className="mt-4 text-muted-foreground md:text-xl/relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover the powerful AI models that power our conversational banking assistant
          </motion.p>

          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col items-center text-center space-y-2 p-6 rounded-lg border bg-card">
              <div className="h-16 w-16 rounded-full fingenie-gradient flex items-center justify-center">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">FinGenie</h3>
              <p className="text-sm text-muted-foreground">
                Our specialized financial AI model trained on banking and finance data
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2 p-6 rounded-lg border bg-card">
              <div className="h-16 w-16 rounded-full bankora-gradient flex items-center justify-center">
                <Database className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Bankora-AI</h3>
              <p className="text-sm text-muted-foreground">
                Real-time information about Ghanaian banks through search and AI processing
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

