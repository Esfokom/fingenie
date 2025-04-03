"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import AppSidebar from "@/components/app-sidebar"
import ChatInterface from "@/components/chat-interface"
import { Loader2 } from "lucide-react"
import { useModelStore } from "@/lib/stores/model-store"
import { useChatStore } from "@/lib/stores/chat-store"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { saveConversation } from "@/lib/api"

export default function AppPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const { activeModel } = useModelStore()
  const { activeConversationId, setActiveConversationId } = useChatStore()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/")
      } else {
        setUser(currentUser)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  // Add a useEffect to ensure a conversation exists
  useEffect(() => {
    const createInitialConversation = async () => {
      if (user && !activeConversationId) {
        try {
          // Check if user has any conversations for the active model
          const userRef = doc(db, "users", user.uid)
          const userDoc = await getDoc(userRef)

          if (userDoc.exists()) {
            const userData = userDoc.data()
            const conversations = userData.conversations || []

            // Filter conversations by model type
            const modelConversations = conversations.filter((conv: any) => conv.modelType === activeModel)

            if (modelConversations.length === 0) {
              // Create a new conversation if none exists for this model
              const title = activeModel === "fingenie" ? "New FinGenie Conversation" : "New Bankora-AI Conversation"

              const result = await saveConversation(user.uid, activeModel, title)

              if (result.success) {
                setActiveConversationId(result.conversationId)
              }
            } else {
              // Set the first conversation as active
              setActiveConversationId(modelConversations[0].id)
            }
          }
        } catch (error) {
          console.error("Error creating initial conversation:", error)
        }
      }
    }

    createInitialConversation()
  }, [user, activeConversationId, activeModel, setActiveConversationId])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <main className="flex h-screen overflow-hidden">
      <AppSidebar />
      <ChatInterface />
    </main>
  )
}

