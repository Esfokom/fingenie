import axios from "axios"
import { db } from "./firebase"
import { collection, addDoc, updateDoc, doc, arrayUnion, getDoc, deleteDoc } from "firebase/firestore"
import type { Message, UserConversation } from "@/types/chat"

const FINGENIE_API_URL = process.env.NEXT_PUBLIC_FINGENIE_API_URL
const FINGENIE_API_KEY = process.env.NEXT_PUBLIC_FINGENIE_API_KEY
const BANKORA_API_URL = process.env.NEXT_PUBLIC_BANKORA_API_URL

export async function queryFinGenie(message: string) {
  try {
    const response = await axios.post(`${FINGENIE_API_URL}?key=${FINGENIE_API_KEY}`, {
      contents: [
        {
          parts: [
            {
              text: message,
            },
          ],
        },
      ],
    })

    return {
      success: true,
      data: response.data,
      text: response.data.candidates[0].content.parts[0].text,
    }
  } catch (error: any) {
    console.error("Error querying FinGenie:", error)
    return {
      success: false,
      error: error.response?.data?.error || error.message || "Failed to query FinGenie",
    }
  }
}

export async function queryBankoraAI(message: string) {
  try {
    console.log("Sending request to Bankora-AI:", message)

    // Using the exact format that works in Postman
    const response = await axios({
      method: "post",
      url: BANKORA_API_URL,
      data: {
        query: message,
      },
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 60000, // 60 seconds timeout
    })

    console.log("Bankora-AI response status:", response.status)
    console.log("Bankora-AI response data:", response.data)

    // Check if the response has the expected structure
    if (!response.data || typeof response.data.response !== "string") {
      console.error("Invalid response format from Bankora-AI:", response.data)
      throw new Error("Invalid response format from Bankora-AI")
    }

    return {
      success: true,
      data: response.data,
      text: response.data.response,
    }
  } catch (error: any) {
    console.error("Error querying Bankora-AI:", error)

    // Detailed error logging
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Bankora-AI error response data:", error.response.data)
      console.error("Bankora-AI error response status:", error.response.status)
      console.error("Bankora-AI error response headers:", error.response.headers)
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Bankora-AI error request:", error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Bankora-AI error message:", error.message)
    }

    // Provide more detailed error information
    const errorMessage = error.response?.data?.error || error.message || "Failed to query Bankora-AI"

    return {
      success: false,
      error: errorMessage,
    }
  }
}

// We'll keep the fallback function but it should rarely be needed now
export async function fallbackBankoraResponse(message: string) {
  // If the Bankora-AI service is down, use this fallback
  try {
    // Use FinGenie as a fallback
    const response = await queryFinGenie(
      `[Acting as Bankora-AI, a specialized system for Ghanaian banking information] ${message}`,
    )

    if (response.success) {
      return {
        success: true,
        data: { response: response.text },
        text: response.text,
      }
    } else {
      throw new Error(response.error)
    }
  } catch (error: any) {
    return {
      success: false,
      error: "Both Bankora-AI and fallback services failed. Please try again later.",
    }
  }
}

export async function saveConversation(userId: string, modelType: string, title: string) {
  try {
    // Create the conversation document
    const conversationRef = await addDoc(collection(db, "conversations"), {
      userId,
      modelType,
      title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    })

    // Add the conversation to the user's history
    const userRef = doc(db, "users", userId)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      // Create a conversation reference for the user's history
      const userConversation: UserConversation = {
        id: conversationRef.id,
        title,
        modelType,
        updatedAt: new Date().toISOString(),
      }

      // Update the user document with the new conversation
      await updateDoc(userRef, {
        conversations: arrayUnion(userConversation),
      })
    }

    return {
      success: true,
      conversationId: conversationRef.id,
    }
  } catch (error) {
    console.error("Error saving conversation:", error)
    return {
      success: false,
      error: "Failed to save conversation",
    }
  }
}

export async function saveMessage(userId: string, conversationId: string, message: Message) {
  try {
    const conversationRef = doc(db, "conversations", conversationId)

    // Get the current conversation
    const conversationSnap = await getDoc(conversationRef)

    if (!conversationSnap.exists()) {
      throw new Error("Conversation not found")
    }

    // Update the conversation with the new message
    await updateDoc(conversationRef, {
      messages: arrayUnion(message),
      updatedAt: new Date().toISOString(),
    })

    // Update the conversation in the user's history to reflect the latest update time
    const userRef = doc(db, "users", userId)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      const userData = userDoc.data()
      const conversations = userData.conversations || []

      // Find and update the conversation in the user's history
      const updatedConversations = conversations.map((conv: UserConversation) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            updatedAt: new Date().toISOString(),
          }
        }
        return conv
      })

      // Update the user document with the updated conversations
      await updateDoc(userRef, {
        conversations: updatedConversations,
      })
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error saving message:", error)
    return {
      success: false,
      error: "Failed to save message",
    }
  }
}

// Add this function to update a message
export async function updateMessage(userId: string, conversationId: string, message: Message) {
  try {
    const conversationRef = doc(db, "conversations", conversationId)

    // Get the current conversation
    const conversationSnap = await getDoc(conversationRef)

    if (!conversationSnap.exists()) {
      throw new Error("Conversation not found")
    }

    const conversation = conversationSnap.data()
    const messages = conversation.messages || []

    // Find and update the message
    const updatedMessages = messages.map((msg: Message) => {
      if (msg.id === message.id) {
        return message
      }
      return msg
    })

    // If the message doesn't exist, add it
    if (!messages.some((msg: Message) => msg.id === message.id)) {
      updatedMessages.push(message)
    }

    // Update the conversation with the updated messages
    await updateDoc(conversationRef, {
      messages: updatedMessages,
      updatedAt: new Date().toISOString(),
    })

    // Update the conversation in the user's history to reflect the latest update time
    const userRef = doc(db, "users", userId)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      const userData = userDoc.data()
      const conversations = userData.conversations || []

      // Find and update the conversation in the user's history
      const updatedConversations = conversations.map((conv: UserConversation) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            updatedAt: new Date().toISOString(),
          }
        }
        return conv
      })

      // Update the user document with the updated conversations
      await updateDoc(userRef, {
        conversations: updatedConversations,
      })
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error updating message:", error)
    return {
      success: false,
      error: "Failed to update message",
    }
  }
}

export async function getUserConversations(userId: string) {
  try {
    const userRef = doc(db, "users", userId)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      return {
        success: true,
        conversations: {
          fingenie: [],
          bankora: [],
        },
      }
    }

    const userData = userDoc.data()
    const allConversations = userData.conversations || []

    // Sort conversations by updatedAt (newest first)
    const sortedConversations = [...allConversations].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )

    // Separate conversations by model type
    const fingenieConversations = sortedConversations.filter((conv: UserConversation) => conv.modelType === "fingenie")

    const bankoraConversations = sortedConversations.filter((conv: UserConversation) => conv.modelType === "bankora")

    return {
      success: true,
      conversations: {
        fingenie: fingenieConversations,
        bankora: bankoraConversations,
      },
    }
  } catch (error) {
    console.error("Error getting user conversations:", error)
    return {
      success: false,
      error: "Failed to get conversations",
    }
  }
}

export async function getConversationMessages(conversationId: string) {
  try {
    const conversationRef = doc(db, "conversations", conversationId)
    const conversationSnap = await getDoc(conversationRef)

    if (!conversationSnap.exists()) {
      throw new Error("Conversation not found")
    }

    const data = conversationSnap.data()

    return {
      success: true,
      messages: data.messages || [],
      title: data.title,
      modelType: data.modelType,
    }
  } catch (error) {
    console.error("Error getting conversation messages:", error)
    return {
      success: false,
      error: "Failed to get conversation messages",
    }
  }
}

export async function deleteConversation(userId: string, conversationId: string) {
  try {
    // Delete the conversation document
    await deleteDoc(doc(db, "conversations", conversationId))

    // Remove the conversation from the user's history
    const userRef = doc(db, "users", userId)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      const userData = userDoc.data()
      const conversations = userData.conversations || []

      // Filter out the deleted conversation
      const updatedConversations = conversations.filter((conv: UserConversation) => conv.id !== conversationId)

      // Update the user document with the filtered conversations
      await updateDoc(userRef, {
        conversations: updatedConversations,
      })
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error deleting conversation:", error)
    return {
      success: false,
      error: "Failed to delete conversation",
    }
  }
}

export async function updateConversationTitle(userId: string, conversationId: string, newTitle: string) {
  try {
    // Update the conversation document
    const conversationRef = doc(db, "conversations", conversationId)
    await updateDoc(conversationRef, {
      title: newTitle,
      updatedAt: new Date().toISOString(),
    })

    // Update the conversation in the user's history
    const userRef = doc(db, "users", userId)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      const userData = userDoc.data()
      const conversations = userData.conversations || []

      // Find and update the conversation in the user's history
      const updatedConversations = conversations.map((conv: UserConversation) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            title: newTitle,
            updatedAt: new Date().toISOString(),
          }
        }
        return conv
      })

      // Update the user document with the updated conversations
      await updateDoc(userRef, {
        conversations: updatedConversations,
      })
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error updating conversation title:", error)
    return {
      success: false,
      error: "Failed to update conversation title",
    }
  }
}

