export interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: string
}

export interface Conversation {
  id: string
  userId: string
  modelType: "fingenie" | "bankora"
  title: string
  createdAt: string
  updatedAt: string
  messages: Message[]
}

export interface UserConversation {
  id: string
  title: string
  modelType: "fingenie" | "bankora"
  updatedAt: string
}

