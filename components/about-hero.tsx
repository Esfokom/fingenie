"use client"

import { motion } from "framer-motion"
import { Brain, MessageSquare, Shield } from "lucide-react"

export default function AboutHero() {
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
            About <span className="gradient-text">FinGenie</span>
          </motion.h1>
          <motion.p
            className="mt-4 text-muted-foreground md:text-xl/relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Revolutionizing banking through conversational AI to make financial management simpler, smarter, and more
            accessible for everyone.
          </motion.p>

          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Leveraging advanced AI models to provide accurate financial information
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Conversational</h3>
              <p className="text-sm text-muted-foreground">
                Natural language interface for intuitive banking interactions
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Secure</h3>
              <p className="text-sm text-muted-foreground">Built with security and privacy as core principles</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

