"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, HelpCircle, Target } from "lucide-react"

export default function AboutContent() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter">Our Mission</h2>
            <p className="text-muted-foreground md:text-lg/relaxed">
              At FinGenie, we're on a mission to transform how people interact with their banking services. Traditional
              banking apps often require users to navigate complex interfaces to access financial information. Many
              users struggle with tracking expenses, managing savings, and making informed financial decisions.
            </p>
            <p className="text-muted-foreground md:text-lg/relaxed">
              We believe that banking should be as simple as having a conversation. Our AI-powered assistant provides
              instant answers to financial questions, helps track expenses, and offers personalized financial advice -
              all through a natural, conversational interface.
            </p>

            <div className="pt-4 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Simplify Banking</h3>
                  <p className="text-sm text-muted-foreground">
                    Make financial information accessible through natural conversation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Empower Users</h3>
                  <p className="text-sm text-muted-foreground">
                    Help people make better financial decisions with AI-powered insights
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">Bridge the Gap</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect users with their banks through intuitive AI interfaces
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue="problem" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="problem">The Problem</TabsTrigger>
                <TabsTrigger value="solution">Our Solution</TabsTrigger>
                <TabsTrigger value="vision">Our Vision</TabsTrigger>
              </TabsList>

              <TabsContent value="problem" className="mt-6">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                        <HelpCircle className="h-5 w-5 text-destructive" />
                      </div>
                      <h3 className="text-xl font-semibold">The Banking Challenge</h3>
                    </div>

                    <ul className="space-y-3 mt-4">
                      <li className="flex items-start gap-2">
                        <span className="text-destructive font-bold mt-1">•</span>
                        <p>Complex banking interfaces that are difficult to navigate</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive font-bold mt-1">•</span>
                        <p>Difficulty tracking expenses and managing savings effectively</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive font-bold mt-1">•</span>
                        <p>Limited access to personalized financial advice</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive font-bold mt-1">•</span>
                        <p>Existing chatbots lack deep financial understanding</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive font-bold mt-1">•</span>
                        <p>Disconnected banking services that don't provide a unified experience</p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="solution" className="mt-6">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">The FinGenie Solution</h3>
                    </div>

                    <ul className="space-y-3 mt-4">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <p>Conversational AI interface that understands natural language</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <p>Specialized financial knowledge through our finetuned FinGenie model</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <p>Real-time banking information through Bankora-AI</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <p>Personalized financial insights and recommendations</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <p>Secure and private handling of financial information</p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vision" className="mt-6">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Target className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">Our Future Vision</h3>
                    </div>

                    <ul className="space-y-3 mt-4">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <p>Direct integration with major banks for real-time account management</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <p>AI-powered financial planning and wealth management</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <p>Voice-activated banking through multiple devices</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <p>Predictive financial insights based on spending patterns</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <p>Creating a financial ecosystem that works for everyone</p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

