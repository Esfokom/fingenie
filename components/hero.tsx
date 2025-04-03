"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, MessageSquare, Shield, Sparkles } from "lucide-react"

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 hero-gradient -z-10" />
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="gradient-text">FinGenie</span>: Your AI-Powered Banking Assistant
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Simplify your banking experience with our conversational AI assistant. Get instant answers to financial
                questions and real-time banking information.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                asChild
                size="lg"
                className="group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Link href="/auth/sign-up">
                  Get Started
                  <ArrowRight
                    className={`ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                  />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </motion.div>
            <motion.div
              className="mt-6 flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">AI-Powered Insights</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Conversational Interface</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Secure & Private</span>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative w-full max-w-[500px] overflow-hidden rounded-lg border bg-background shadow-xl">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="text-xs font-medium">FinGenie Chat</div>
                <div className="w-16" />
              </div>
              <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                <div className="flex flex-col gap-4">
                  <div className="chat-bubble-ai rounded-lg p-3 max-w-[80%] self-start">
                    <p>Hello! I'm FinGenie, your AI banking assistant. How can I help you today?</p>
                  </div>
                  <div className="chat-bubble-user rounded-lg p-3 max-w-[80%] self-end">
                    <p>What is a banking API?</p>
                  </div>
                  <div className="chat-bubble-ai rounded-lg p-3 max-w-[80%] self-start">
                    <p>
                      A banking API is an application programming interface that connects financial applications to a
                      consumer's checking account, allowing access to data and triggering real-time payments and other
                      capabilities.
                    </p>
                    <p className="mt-2">
                      It provides access to payment initiation capabilities through account access, enabling account
                      holders to initiate payments directly from their checking accounts.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t p-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Type your message..."
                      disabled
                    />
                  </div>
                  <Button size="sm" disabled>
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

