"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Building, CreditCard, DollarSign, LineChart, Lock, MessageSquare, Search } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Conversational Banking",
      description: "Interact with your banking assistant through natural language conversations.",
    },
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "AI-Powered Insights",
      description: "Get intelligent financial insights and recommendations based on your queries.",
    },
    {
      icon: <Building className="h-10 w-10 text-primary" />,
      title: "Bank Information",
      description: "Access up-to-date information about banks in Ghana through Bankora-AI.",
    },
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Financial Knowledge",
      description: "Ask questions about banking terms, services, and financial concepts.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Card Management",
      description: "Learn about card security, limits, and best practices for card usage.",
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: "Financial Planning",
      description: "Get guidance on savings, investments, and financial planning strategies.",
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Security Information",
      description: "Learn about banking security practices and how to protect your accounts.",
    },
    {
      icon: <DollarSign className="h-10 w-10 text-primary" />,
      title: "Loan & Credit Info",
      description: "Understand loan options, credit scores, and borrowing best practices.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Features</h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[800px] mx-auto">
            Discover how FinGenie can transform your banking experience with these powerful features
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

