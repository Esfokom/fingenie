"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import AppSidebar from "@/components/app-sidebar"
import { Loader2, Plus, ArrowUpRight, CreditCard, DollarSign, Wallet, PieChart, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { getUserExpenses, getUserTransactions, getExpenseSummary } from "@/lib/expense-api"
import type { Expense, Transaction, ExpenseSummary } from "@/types/expense"
import { ExpenseForm } from "@/components/expense-form"
import { TransactionForm } from "@/components/transaction-form"
import { ExpenseChart } from "@/components/expense-chart"
import { TransactionList } from "@/components/transaction-list"
import { ExpenseList } from "@/components/expense-list"

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [summary, setSummary] = useState<ExpenseSummary | null>(null)
  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const [showTransactionForm, setShowTransactionForm] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/")
      } else {
        setUser(currentUser)
        fetchData(currentUser.uid)
      }
    })

    return () => unsubscribe()
  }, [router])

  const fetchData = async (userId: string) => {
    setLoading(true)
    try {
      // Fetch expenses
      const expensesResult = await getUserExpenses(userId)
      if (expensesResult.success && expensesResult.expenses) {
        setExpenses(expensesResult.expenses)
      }

      // Fetch transactions
      const transactionsResult = await getUserTransactions(userId)
      if (transactionsResult.success && transactionsResult.transactions) {
        setTransactions(transactionsResult.transactions)
      }

      // Fetch summary
      const summaryResult = await getExpenseSummary(userId)
      if (summaryResult.success && summaryResult.summary) {
        setSummary(summaryResult.summary)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleExpenseAdded = () => {
    if (user) {
      fetchData(user.uid)
      setShowExpenseForm(false)
    }
  }

  const handleTransactionAdded = () => {
    if (user) {
      fetchData(user.uid)
      setShowTransactionForm(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Calculate recent income and expenses
  const recentIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const recentExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const balance = recentIncome - recentExpenses

  return (
    <main className="flex h-screen overflow-hidden">
      <AppSidebar />
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="container py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Financial Dashboard</h1>
            <div className="flex gap-2">
              <Button onClick={() => setShowExpenseForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
              <Button variant="outline" onClick={() => setShowTransactionForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
                    <h3 className="text-2xl font-bold mt-1">GH₵ {balance.toFixed(2)}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <ArrowUpRight
                    className={`mr-1 h-4 w-4 ${balance >= 0 ? "text-green-500" : "text-red-500 rotate-180"}`}
                  />
                  <span className={balance >= 0 ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                    {balance >= 0 ? "Positive" : "Negative"} balance
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Recent Income</p>
                    <h3 className="text-2xl font-bold mt-1">GH₵ {recentIncome.toFixed(2)}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <span>From {transactions.filter((t) => t.type === "income").length} transactions</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Recent Expenses</p>
                    <h3 className="text-2xl font-bold mt-1">GH₵ {recentExpenses.toFixed(2)}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <span>From {transactions.filter((t) => t.type === "expense").length} transactions</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="mr-2 h-5 w-5" />
                      Expense Categories
                    </CardTitle>
                    <CardDescription>Breakdown of your expenses by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">{summary && <ExpenseChart data={summary.categoryBreakdown} />}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Monthly Trend
                    </CardTitle>
                    <CardDescription>Your expense trend over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">{summary && <ExpenseChart data={summary.monthlyTrend} type="bar" />}</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your most recent financial activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <TransactionList transactions={transactions.slice(0, 5)} />
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => document.querySelector('[data-value="transactions"]')?.click()}
                  >
                    View All Transactions
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="expenses" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>All Expenses</CardTitle>
                    <Button size="sm" onClick={() => setShowExpenseForm(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Expense
                    </Button>
                  </div>
                  <CardDescription>Manage and track your expenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ExpenseList expenses={expenses} onUpdate={() => fetchData(user.uid)} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>All Transactions</CardTitle>
                    <Button size="sm" onClick={() => setShowTransactionForm(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Transaction
                    </Button>
                  </div>
                  <CardDescription>View all your financial transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <TransactionList transactions={transactions} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Expense Form Modal */}
      {showExpenseForm && (
        <ExpenseForm userId={user.uid} onClose={() => setShowExpenseForm(false)} onSuccess={handleExpenseAdded} />
      )}

      {/* Transaction Form Modal */}
      {showTransactionForm && (
        <TransactionForm
          userId={user.uid}
          onClose={() => setShowTransactionForm(false)}
          onSuccess={handleTransactionAdded}
        />
      )}
    </main>
  )
}

