"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Building, Users } from "lucide-react"

export default function AboutMission() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Story</h2>
          <p className="mt-4 text-muted-foreground md:text-lg/relaxed">
            FinGenie was born from a vision to make banking more accessible and user-friendly through the power of
            artificial intelligence.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Our Beginning</h3>
                </div>

                <p className="text-muted-foreground">
                  FinGenie started as a project at Kwame Nkrumah University of Science and Technology (KNUST) by a group
                  of passionate computer science students who recognized the challenges people face with traditional
                  banking interfaces.
                </p>

                <p className="text-muted-foreground">
                  The team observed that while banking services were becoming increasingly digital, the user experience
                  remained complex and often frustrating. They envisioned a solution that would leverage the power of AI
                  to create a more intuitive and conversational banking experience.
                </p>

                <p className="text-muted-foreground">
                  After months of research and development, the team created a prototype of FinGenie, an AI-powered
                  conversational banking assistant that could understand and respond to natural language queries about
                  banking and finance.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Growing Together</h3>
                </div>

                <p className="text-muted-foreground">
                  As the project evolved, the team expanded FinGenie's capabilities by developing two specialized AI
                  models: the core FinGenie model for general banking and finance knowledge, and Bankora-AI for
                  real-time information about Ghanaian banks.
                </p>

                <p className="text-muted-foreground">
                  The team's diverse skills in frontend development, backend engineering, UI/UX design, machine
                  learning, and quality assurance came together to create a comprehensive solution that addresses the
                  real needs of banking customers.
                </p>

                <p className="text-muted-foreground">
                  Today, FinGenie continues to evolve with ambitious plans to integrate directly with banking APIs,
                  enabling users to not only get information but also perform transactions through a simple,
                  conversational interface.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Join Us on Our Journey</h3>
          <p className="text-muted-foreground md:text-lg/relaxed">
            We're just getting started, and we're excited about the future of conversational banking. Our roadmap
            includes direct integration with major Ghanaian banks, enhanced security features, and more personalized
            financial insights.
          </p>
          <p className="mt-4 text-muted-foreground md:text-lg/relaxed">
            We invite you to join us on this journey to revolutionize the banking experience in Ghana and beyond.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

