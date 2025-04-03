"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpRight,
  BarChart3,
  CreditCard,
  DollarSign,
  LineChart,
  PieChart,
  Wallet,
  Brain,
  MessageSquare,
} from "lucide-react"

export default function PreviewDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    })
  }, [activeTab, controls])

  const handleTabChange = (value: string) => {
    controls
      .start({
        opacity: 0,
        y: 20,
        transition: { duration: 0.2 },
      })
      .then(() => {
        setActiveTab(value)
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        })
      })
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Smart Banking Insights</h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[800px] mx-auto">
            Visualize your financial data and get AI-powered insights to make better financial decisions
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border bg-background shadow-xl">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full fingenie-gradient">
                <div className="absolute inset-0.5 rounded-full bg-background dark:bg-card"></div>
                <div className="absolute inset-2 rounded-full fingenie-gradient"></div>
              </div>
              <span className="font-semibold">FinGenie Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
            </div>
          </div>

          <div className="p-6">
            <Tabs defaultValue="overview" className="w-full" onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="spending">Spending</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <motion.div animate={controls} initial={{ opacity: 0, y: 20 }}>
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
                            <h3 className="text-2xl font-bold mt-1">GH₵ 24,500.00</h3>
                          </div>
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Wallet className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-muted-foreground">
                          <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                          <span className="text-green-500 font-medium">+2.5%</span>
                          <span className="ml-1">from last month</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Monthly Spending</p>
                            <h3 className="text-2xl font-bold mt-1">GH₵ 3,250.00</h3>
                          </div>
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-muted-foreground">
                          <ArrowUpRight className="mr-1 h-4 w-4 text-red-500 rotate-180" />
                          <span className="text-red-500 font-medium">-4.2%</span>
                          <span className="ml-1">from last month</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Savings Goal</p>
                            <h3 className="text-2xl font-bold mt-1">GH₵ 12,000.00</h3>
                          </div>
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">65%</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: "65%" }}></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold">Recent Transactions</h4>
                        <LineChart className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="space-y-4">
                        {[
                          { name: "Grocery Store", amount: "GH₵ 120.50", date: "Today", type: "expense" },
                          { name: "Salary Deposit", amount: "GH₵ 3,500.00", date: "Yesterday", type: "income" },
                          { name: "Electricity Bill", amount: "GH₵ 85.20", date: "2 days ago", type: "expense" },
                          { name: "Online Transfer", amount: "GH₵ 250.00", date: "3 days ago", type: "expense" },
                        ].map((transaction, index) => (
                          <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                            <div className="flex items-center gap-3">
                              <div
                                className={`h-10 w-10 rounded-full flex items-center justify-center ${transaction.type === "income" ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"}`}
                              >
                                {transaction.type === "income" ? (
                                  <ArrowUpRight
                                    className={`h-5 w-5 ${transaction.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                                  />
                                ) : (
                                  <ArrowUpRight
                                    className={`h-5 w-5 rotate-180 ${transaction.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                                  />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{transaction.name}</p>
                                <p className="text-xs text-muted-foreground">{transaction.date}</p>
                              </div>
                            </div>
                            <p
                              className={`font-medium ${transaction.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                            >
                              {transaction.type === "income" ? "+" : "-"}
                              {transaction.amount}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="spending" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-lg font-semibold">Spending Categories</h4>
                        <PieChart className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-center justify-center">
                          <div className="relative h-48 w-48">
                            <div className="absolute inset-0 rounded-full border-8 border-primary/20"></div>
                            <div
                              className="absolute inset-0 rounded-full border-8 border-transparent border-t-primary"
                              style={{ transform: "rotate(45deg)" }}
                            ></div>
                            <div
                              className="absolute inset-0 rounded-full border-8 border-transparent border-r-primary/70"
                              style={{ transform: "rotate(45deg)" }}
                            ></div>
                            <div
                              className="absolute inset-0 rounded-full border-8 border-transparent border-b-primary/50"
                              style={{ transform: "rotate(45deg)" }}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <p className="text-sm font-medium text-muted-foreground">Total</p>
                                <p className="text-2xl font-bold">GH₵ 3,250</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {[
                            { category: "Food & Dining", amount: "GH₵ 850.00", percentage: 26, color: "bg-primary" },
                            {
                              category: "Transportation",
                              amount: "GH₵ 650.00",
                              percentage: 20,
                              color: "bg-primary/70",
                            },
                            { category: "Utilities", amount: "GH₵ 520.00", percentage: 16, color: "bg-primary/50" },
                            { category: "Entertainment", amount: "GH₵ 420.00", percentage: 13, color: "bg-primary/30" },
                            { category: "Shopping", amount: "GH₵ 380.00", percentage: 12, color: "bg-primary/20" },
                            { category: "Others", amount: "GH₵ 430.00", percentage: 13, color: "bg-muted" },
                          ].map((category, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">{category.category}</span>
                                <span>
                                  {category.amount} ({category.percentage}%)
                                </span>
                              </div>
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${category.color} rounded-full`}
                                  style={{ width: `${category.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-lg font-semibold">Monthly Spending Trend</h4>
                        <BarChart3 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="h-64 flex items-end justify-between gap-2">
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                          (month, index) => {
                            const heights = [40, 65, 45, 60, 80, 55, 70, 50, 65, 75, 90, 60]
                            return (
                              <div key={index} className="flex flex-col items-center">
                                <div
                                  className={`w-8 rounded-t-md ${index === 10 ? "bg-primary" : "bg-primary/60"}`}
                                  style={{ height: `${heights[index]}%` }}
                                ></div>
                                <span className="mt-2 text-xs text-muted-foreground">{month}</span>
                              </div>
                            )
                          },
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="insights" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Brain className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold">AI Financial Insights</h4>
                          <p className="text-sm text-muted-foreground">
                            Personalized recommendations based on your spending habits
                          </p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="p-4 rounded-lg border bg-muted/50">
                          <h5 className="font-medium mb-2">Spending Alert</h5>
                          <p className="text-sm text-muted-foreground">
                            Your food & dining expenses are 15% higher than last month. Consider setting a budget for
                            this category.
                          </p>
                        </div>

                        <div className="p-4 rounded-lg border bg-muted/50">
                          <h5 className="font-medium mb-2">Savings Opportunity</h5>
                          <p className="text-sm text-muted-foreground">
                            Based on your income and spending patterns, you could increase your monthly savings by GH₵
                            500 by reducing discretionary spending.
                          </p>
                        </div>

                        <div className="p-4 rounded-lg border bg-muted/50">
                          <h5 className="font-medium mb-2">Bill Payment Reminder</h5>
                          <p className="text-sm text-muted-foreground">
                            Your electricity bill is due in 3 days. Make sure to pay it on time to avoid late fees.
                          </p>
                        </div>

                        <div className="p-4 rounded-lg border bg-green-100 dark:bg-green-900/20">
                          <h5 className="font-medium mb-2 text-green-700 dark:text-green-300">Investment Tip</h5>
                          <p className="text-sm text-green-600/80 dark:text-green-400/80">
                            With your current savings rate, you're on track to reach your emergency fund goal by June
                            2025. Great job!
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold">Savings Goal Progress</h4>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">Emergency Fund</span>
                              <span>GH₵ 8,000 / GH₵ 12,000</span>
                            </div>
                            <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: "67%" }}></div>
                            </div>
                            <p className="text-xs text-muted-foreground">On track - 67% complete</p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">New Laptop</span>
                              <span>GH₵ 3,500 / GH₵ 5,000</span>
                            </div>
                            <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: "70%" }}></div>
                            </div>
                            <p className="text-xs text-muted-foreground">On track - 70% complete</p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">Vacation</span>
                              <span>GH₵ 2,000 / GH₵ 8,000</span>
                            </div>
                            <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: "25%" }}></div>
                            </div>
                            <p className="text-xs text-muted-foreground">Behind schedule - 25% complete</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold">Ask FinGenie</h4>
                        </div>
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            Have questions about your finances? Ask FinGenie for personalized advice.
                          </p>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <MessageSquare className="h-4 w-4 text-primary" />
                              </div>
                              <p className="text-sm font-medium">How can I improve my savings rate?</p>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <MessageSquare className="h-4 w-4 text-primary" />
                              </div>
                              <p className="text-sm font-medium">What's the best way to budget for groceries?</p>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <MessageSquare className="h-4 w-4 text-primary" />
                              </div>
                              <p className="text-sm font-medium">Should I pay off debt or save more?</p>
                            </div>
                          </div>

                          <button className="w-full py-2 px-4 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium transition-colors">
                            Open FinGenie Chat
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </motion.div>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}

