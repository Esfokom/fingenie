"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheck, Building, CreditCard, Lock, Wallet } from "lucide-react"

export default function Roadmap() {
  const roadmapItems = [
    {
      icon: <Building className="h-10 w-10 text-primary" />,
      title: "Bank API Integration",
      description:
        "Direct integration with Ecobank and other major Ghanaian banks to access real-time account information.",
      quarter: "Q1 2025",
    },
    {
      icon: <Wallet className="h-10 w-10 text-primary" />,
      title: "Transaction Management",
      description:
        "View and manage your transactions directly through FinGenie with detailed analytics and categorization.",
      quarter: "Q2 2025",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Payment Capabilities",
      description: "Send money, pay bills, and make transfers directly through the conversational interface.",
      quarter: "Q3 2025",
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Enhanced Security",
      description: "Advanced biometric authentication and encryption for maximum security of your financial data.",
      quarter: "Q4 2025",
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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Coming Soon</h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[800px] mx-auto">
            Our roadmap for 2025 includes exciting new features to enhance your banking experience
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {roadmapItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <div className="mb-2">{item.icon}</div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="text-sm font-medium text-primary">{item.quarter}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <BadgeCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Bank Integration Preview</h3>
                  <p className="text-muted-foreground">See how FinGenie will connect with your bank account</p>
                </div>
              </div>

              <div className="rounded-lg border overflow-hidden">
                <div className="bg-muted p-4 border-b">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <div className="ml-2 text-xs font-medium">Bank Connection Demo</div>
                  </div>
                </div>

                <div className="p-6 space-y-4 bg-background">
                  <div className="chat-bubble-user rounded-lg p-3 max-w-[80%] self-end ml-auto">
                    <p>What's my current account balance?</p>
                  </div>

                  <div className="chat-bubble-ai rounded-lg p-3 max-w-[80%]">
                    <p>I'll check that for you. Let me connect to your Ecobank account...</p>
                  </div>

                  <div className="flex justify-center my-4">
                    <div className="px-4 py-2 rounded-full bg-muted text-xs font-medium flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                      </span>
                      Connecting to Ecobank...
                    </div>
                  </div>

                  <div className="chat-bubble-ai rounded-lg p-3 max-w-[80%]">
                    <p>
                      Your current account balance is <strong>GH₵ 24,500.00</strong>
                    </p>
                    <p className="mt-2">
                      Your savings account balance is <strong>GH₵ 15,750.00</strong>
                    </p>
                    <div className="mt-4 p-3 rounded-md bg-primary/10 border border-primary/20">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Last 5 transactions:</span>
                      </div>
                      <ul className="text-sm space-y-2">
                        <li className="flex justify-between">
                          <span>Grocery Store</span>
                          <span className="text-red-600 dark:text-red-400">-GH₵ 120.50</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Salary Deposit</span>
                          <span className="text-green-600 dark:text-green-400">+GH₵ 3,500.00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Electricity Bill</span>
                          <span className="text-red-600 dark:text-red-400">-GH₵ 85.20</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="chat-bubble-user rounded-lg p-3 max-w-[80%] self-end ml-auto">
                    <p>Can you transfer GH₵ 500 to my savings account?</p>
                  </div>

                  <div className="chat-bubble-ai rounded-lg p-3 max-w-[80%]">
                    <p>
                      I'd be happy to help you transfer GH₵ 500 from your current account to your savings account.
                      Please confirm this transaction:
                    </p>
                    <div className="mt-4 p-3 rounded-md bg-primary/10 border border-primary/20">
                      <p className="text-sm font-medium">Transfer Details:</p>
                      <ul className="text-sm mt-2 space-y-1">
                        <li className="flex justify-between">
                          <span>From:</span>
                          <span>Current Account (****1234)</span>
                        </li>
                        <li className="flex justify-between">
                          <span>To:</span>
                          <span>Savings Account (****5678)</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Amount:</span>
                          <span>GH₵ 500.00</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Fee:</span>
                          <span>GH₵ 0.00</span>
                        </li>
                      </ul>
                      <div className="mt-3 flex gap-2">
                        <button className="px-3 py-1 text-xs rounded-md bg-primary text-primary-foreground">
                          Confirm
                        </button>
                        <button className="px-3 py-1 text-xs rounded-md bg-muted text-muted-foreground">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-muted-foreground text-center">
                This is a preview of upcoming functionality. Bank integration will be available starting Q1 2025.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

