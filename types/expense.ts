export type ExpenseCategory =
  | "Food & Dining"
  | "Transportation"
  | "Utilities"
  | "Entertainment"
  | "Shopping"
  | "Housing"
  | "Healthcare"
  | "Education"
  | "Personal Care"
  | "Travel"
  | "Gifts & Donations"
  | "Investments"
  | "Debt Payments"
  | "Other"

export interface Expense {
  id: string
  userId: string
  amount: number
  category: ExpenseCategory
  description: string
  date: string // ISO string
  createdAt: string // ISO string
}

export interface Transaction {
  id: string
  userId: string
  amount: number
  type: "income" | "expense"
  category: ExpenseCategory | "Salary" | "Investment" | "Gift" | "Other"
  description: string
  date: string // ISO string
  createdAt: string // ISO string
}

export interface UserProfile {
  userId: string
  displayName: string | null
  email: string | null
  photoURL: string | null
  phoneNumber: string | null
  address: string | null
  occupation: string | null
  monthlyIncome: number | null
  savingsGoal: number | null
  createdAt: string
  updatedAt: string
}

export interface ExpenseSummary {
  totalExpenses: number
  categoryBreakdown: Record<ExpenseCategory, number>
  monthlyTrend: Record<string, number> // Month -> amount
}

