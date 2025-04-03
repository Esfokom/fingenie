import { db } from "./firebase"
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore"
import type { Expense, Transaction, UserProfile, ExpenseSummary, ExpenseCategory } from "@/types/expense"

// Expense functions
export async function addExpense(
  userId: string,
  amount: number,
  category: ExpenseCategory,
  description: string,
  date: string,
): Promise<{ success: boolean; expenseId?: string; error?: string }> {
  try {
    const expense: Omit<Expense, "id"> = {
      userId,
      amount,
      category,
      description,
      date,
      createdAt: new Date().toISOString(),
    }

    const expenseRef = await addDoc(collection(db, "expenses"), expense)

    // Also add as a transaction
    await addTransaction(userId, amount, "expense", category, description, date)

    return {
      success: true,
      expenseId: expenseRef.id,
    }
  } catch (error) {
    console.error("Error adding expense:", error)
    return {
      success: false,
      error: "Failed to add expense",
    }
  }
}

export async function getUserExpenses(userId: string): Promise<{
  success: boolean
  expenses?: Expense[]
  error?: string
}> {
  try {
    const expensesQuery = query(collection(db, "expenses"), where("userId", "==", userId), orderBy("date", "desc"))

    const querySnapshot = await getDocs(expensesQuery)
    const expenses: Expense[] = []

    querySnapshot.forEach((doc) => {
      expenses.push({
        id: doc.id,
        ...doc.data(),
      } as Expense)
    })

    return {
      success: true,
      expenses,
    }
  } catch (error) {
    console.error("Error getting expenses:", error)
    return {
      success: false,
      error: "Failed to get expenses",
    }
  }
}

export async function deleteExpense(expenseId: string): Promise<{
  success: boolean
  error?: string
}> {
  try {
    await deleteDoc(doc(db, "expenses", expenseId))
    return {
      success: true,
    }
  } catch (error) {
    console.error("Error deleting expense:", error)
    return {
      success: false,
      error: "Failed to delete expense",
    }
  }
}

// Transaction functions
export async function addTransaction(
  userId: string,
  amount: number,
  type: "income" | "expense",
  category: string,
  description: string,
  date: string,
): Promise<{ success: boolean; transactionId?: string; error?: string }> {
  try {
    const transaction: Omit<Transaction, "id"> = {
      userId,
      amount,
      type,
      category: category as any,
      description,
      date,
      createdAt: new Date().toISOString(),
    }

    const transactionRef = await addDoc(collection(db, "transactions"), transaction)

    return {
      success: true,
      transactionId: transactionRef.id,
    }
  } catch (error) {
    console.error("Error adding transaction:", error)
    return {
      success: false,
      error: "Failed to add transaction",
    }
  }
}

export async function getUserTransactions(userId: string): Promise<{
  success: boolean
  transactions?: Transaction[]
  error?: string
}> {
  try {
    const transactionsQuery = query(
      collection(db, "transactions"),
      where("userId", "==", userId),
      orderBy("date", "desc"),
    )

    const querySnapshot = await getDocs(transactionsQuery)
    const transactions: Transaction[] = []

    querySnapshot.forEach((doc) => {
      transactions.push({
        id: doc.id,
        ...doc.data(),
      } as Transaction)
    })

    return {
      success: true,
      transactions,
    }
  } catch (error) {
    console.error("Error getting transactions:", error)
    return {
      success: false,
      error: "Failed to get transactions",
    }
  }
}

// User profile functions
// Update the getUserProfile function to read from users collection
export async function getUserProfile(userId: string): Promise<{
  success: boolean
  profile?: UserProfile
  error?: string
}> {
  try {
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      const userData = userSnap.data()
      return {
        success: true,
        profile: {
          userId,
          displayName: userData.displayName || null,
          email: userData.email || null,
          photoURL: userData.photoURL || null,
          phoneNumber: userData.phoneNumber || null,
          address: userData.address || null,
          occupation: userData.occupation || null,
          monthlyIncome: userData.monthlyIncome || null,
          savingsGoal: userData.savingsGoal || null,
          createdAt: userData.createdAt || new Date().toISOString(),
          updatedAt: userData.updatedAt || new Date().toISOString(),
        } as UserProfile,
      }
    } else {
      return {
        success: false,
        error: "Profile not found",
      }
    }
  } catch (error) {
    console.error("Error getting user profile:", error)
    return {
      success: false,
      error: "Failed to get user profile",
    }
  }
}

// Update the updateUserProfile function to write to users collection
export async function updateUserProfile(
  userId: string,
  profileData: Partial<UserProfile>,
): Promise<{ success: boolean; error?: string }> {
  try {
    const userRef = doc(db, "users", userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      // Update existing profile
      await updateDoc(userRef, {
        ...profileData,
        updatedAt: new Date().toISOString(),
      })
    } else {
      // This shouldn't happen normally, but just in case
      throw new Error("User document not found")
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error updating user profile:", error)
    return {
      success: false,
      error: "Failed to update user profile",
    }
  }
}

// Analytics functions
export async function getExpenseSummary(userId: string): Promise<{
  success: boolean
  summary?: ExpenseSummary
  error?: string
}> {
  try {
    const { success, expenses, error } = await getUserExpenses(userId)

    if (!success || !expenses) {
      throw new Error(error || "Failed to get expenses")
    }

    // Calculate total expenses
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

    // Calculate category breakdown
    const categoryBreakdown: Record<ExpenseCategory, number> = {} as Record<ExpenseCategory, number>
    expenses.forEach((expense) => {
      if (!categoryBreakdown[expense.category]) {
        categoryBreakdown[expense.category] = 0
      }
      categoryBreakdown[expense.category] += expense.amount
    })

    // Calculate monthly trend
    const monthlyTrend: Record<string, number> = {}
    expenses.forEach((expense) => {
      const month = expense.date.substring(0, 7) // YYYY-MM
      if (!monthlyTrend[month]) {
        monthlyTrend[month] = 0
      }
      monthlyTrend[month] += expense.amount
    })

    return {
      success: true,
      summary: {
        totalExpenses,
        categoryBreakdown,
        monthlyTrend,
      },
    }
  } catch (error) {
    console.error("Error getting expense summary:", error)
    return {
      success: false,
      error: "Failed to get expense summary",
    }
  }
}

