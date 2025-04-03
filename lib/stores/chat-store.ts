import { create } from "zustand"
import type { Message } from "@/types/chat"

interface ChatState {
  activeConversationId: string | null
  setActiveConversationId: (id: string | null) => void
  messages: Record<string, Message[]>
  addMessage: (conversationId: string, message: Message) => void
  clearMessages: (conversationId: string) => void
}

export const useChatStore = create<ChatState>((set) => ({
  activeConversationId: null,
  setActiveConversationId: (id) => set({ activeConversationId: id }),
  messages: {},
  addMessage: (conversationId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), message],
      },
    })),
  clearMessages: (conversationId) =>
    set((state) => {
      const newMessages = { ...state.messages }
      delete newMessages[conversationId]
      return { messages: newMessages }
    }),
}))

