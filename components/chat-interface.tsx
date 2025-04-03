"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/lib/auth-provider"
import { useModelStore } from "@/lib/stores/model-store"
import { useChatStore } from "@/lib/stores/chat-store"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Brain, Database, Loader2, SendHorizontal, Copy, RotateCcw, Pencil } from "lucide-react"
import type { Message } from "@/types/chat"
import { v4 as uuidv4 } from "uuid"
import {
  queryFinGenie,
  queryBankoraAI,
  fallbackBankoraResponse,
  saveMessage,
  getConversationMessages,
  updateMessage,
} from "@/lib/api"
import ReactMarkdown from "react-markdown"
import { motion, AnimatePresence } from "framer-motion"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ChatInterface() {
  const { user } = useAuth()
  const { activeModel } = useModelStore()
  const { activeConversationId, messages, addMessage } = useChatStore()
  const { toast } = useToast()

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversationMessages, setConversationMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [newMessageId, setNewMessageId] = useState<string | null>(null)
  const [editingMessage, setEditingMessage] = useState<Message | null>(null)
  const [editInput, setEditInput] = useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(null)

  // Suggested questions for new conversations
  const suggestedQuestions = {
    fingenie: [
      "What is a banking API?",
      "How do I protect my online banking from fraud?",
      "What's the difference between a savings account and a fixed deposit?",
      "How does compound interest work?",
      "What documents do I need to open a business account?",
    ],
    bankora: [
      "Tell me about Ecobank Ghana services",
      "What are the loan options at GCB Bank?",
      "How many branches does Stanbic Bank have in Ghana?",
      "What are the current savings account rates at Absa Bank Ghana?",
      "What mobile banking features does Zenith Bank offer?",
    ],
  }

  useEffect(() => {
    if (activeConversationId) {
      fetchConversationMessages()
    } else {
      setConversationMessages([])
    }
  }, [activeConversationId])

  useEffect(() => {
    scrollToBottom()
  }, [conversationMessages])

  const fetchConversationMessages = async () => {
    if (!activeConversationId) return

    try {
      const result = await getConversationMessages(activeConversationId)

      if (result.success) {
        setConversationMessages(result.messages)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Error fetching conversation messages:", error)
      toast({
        title: "Error",
        description: "Failed to load conversation messages",
        variant: "destructive",
      })
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading || !activeConversationId || !user) return

    const userMessage: Message = {
      id: uuidv4(),
      content: input.trim(),
      role: "user",
      timestamp: new Date().toISOString(),
    }

    // Set the new message ID for animation
    setNewMessageId(userMessage.id)

    // Add user message to UI
    setConversationMessages((prev) => [...prev, userMessage])

    // Save user message to Firestore
    await saveMessage(user.uid, activeConversationId, userMessage)

    // Clear input
    setInput("")

    // Set loading state
    setIsLoading(true)

    try {
      let response

      if (activeModel === "fingenie") {
        response = await queryFinGenie(userMessage.content)
      } else {
        // Try Bankora-AI
        response = await queryBankoraAI(userMessage.content)

        // If Bankora-AI fails, use the fallback
        if (!response.success) {
          console.log("Bankora-AI failed, using fallback")
          toast({
            title: "Bankora-AI Service Issue",
            description: "Using backup service for this request",
            variant: "default",
          })

          response = await fallbackBankoraResponse(userMessage.content)
        }
      }

      if (response.success) {
        const aiMessage: Message = {
          id: uuidv4(),
          content: response.text,
          role: "assistant",
          timestamp: new Date().toISOString(),
        }

        // Set the new message ID for animation
        setNewMessageId(aiMessage.id)

        // Add AI message to UI
        setConversationMessages((prev) => [...prev, aiMessage])

        // Save AI message to Firestore
        await saveMessage(user.uid, activeConversationId, aiMessage)

        // Clear the new message ID after animation completes
        setTimeout(() => setNewMessageId(null), 1000)
      } else {
        throw new Error(response.error)
      }
    } catch (error: any) {
      console.error(`Error querying ${activeModel}:`, error)
      toast({
        title: "Error",
        description:
          error.message || `Failed to get response from ${activeModel === "fingenie" ? "FinGenie" : "Bankora-AI"}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied to clipboard",
      description: "Message content has been copied to clipboard",
      variant: "default",
    })
  }

  const handleEditMessage = (message: Message) => {
    setEditingMessage(message)
    setEditInput(message.content)
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = async () => {
    if (!editingMessage || !user || !activeConversationId) return

    try {
      // Create updated message
      const updatedMessage: Message = {
        ...editingMessage,
        content: editInput,
        timestamp: new Date().toISOString(),
      }

      // Update in Firestore
      const result = await updateMessage(user.uid, activeConversationId, updatedMessage)

      if (result.success) {
        // Update in UI
        setConversationMessages((prev) => prev.map((msg) => (msg.id === editingMessage.id ? updatedMessage : msg)))

        toast({
          title: "Success",
          description: "Message updated successfully",
        })

        // Close dialog
        setIsEditDialogOpen(false)
        setEditingMessage(null)
        setEditInput("")

        // If it's a user message, regenerate the AI response
        if (editingMessage.role === "user") {
          const messageIndex = conversationMessages.findIndex((msg) => msg.id === editingMessage.id)
          if (messageIndex >= 0 && messageIndex < conversationMessages.length - 1) {
            handleRegenerateResponse(messageIndex)
          }
        }
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Error updating message:", error)
      toast({
        title: "Error",
        description: "Failed to update message",
        variant: "destructive",
      })
    }
  }

  const handleRegenerateResponse = async (messageIndex: number) => {
    if (!user || !activeConversationId || messageIndex < 0 || messageIndex >= conversationMessages.length) return

    // Get the user message
    const userMessage = conversationMessages[messageIndex]
    if (userMessage.role !== "user") return

    // Set regenerating index to show loading state
    setRegeneratingIndex(messageIndex + 1)

    try {
      let response

      if (activeModel === "fingenie") {
        response = await queryFinGenie(userMessage.content)
      } else {
        response = await queryBankoraAI(userMessage.content)
        if (!response.success) {
          response = await fallbackBankoraResponse(userMessage.content)
        }
      }

      if (response.success) {
        // Create new AI message
        const aiMessage: Message = {
          id: conversationMessages[messageIndex + 1]?.id || uuidv4(),
          content: response.text,
          role: "assistant",
          timestamp: new Date().toISOString(),
        }

        // Update in Firestore
        await updateMessage(user.uid, activeConversationId, aiMessage)

        // Update in UI
        setConversationMessages((prev) => {
          const newMessages = [...prev]
          // If there's already a response, replace it
          if (messageIndex + 1 < newMessages.length) {
            newMessages[messageIndex + 1] = aiMessage
          } else {
            // Otherwise add the new response
            newMessages.push(aiMessage)
          }
          return newMessages
        })

        toast({
          title: "Success",
          description: "Response regenerated successfully",
        })
      } else {
        throw new Error(response.error)
      }
    } catch (error: any) {
      console.error(`Error regenerating response:`, error)
      toast({
        title: "Error",
        description: error.message || "Failed to regenerate response",
        variant: "destructive",
      })
    } finally {
      setRegeneratingIndex(null)
    }
  }

  // Animation variants
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }

  return (
    <div className="flex flex-1 flex-col h-full relative">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background to-background/80 backdrop-blur-sm z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-tl from-primary/10 to-transparent rounded-full filter blur-3xl"></div>
        {activeModel === "bankora" && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-64 bg-gradient-to-r from-[#1e40af]/10 to-[#3b82f6]/10 rounded-full filter blur-3xl"></div>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-70"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 relative z-10">
        {conversationMessages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center px-4"
          >
            <div
              className={`h-16 w-16 rounded-full ${activeModel === "fingenie" ? "fingenie-gradient" : "bankora-gradient"} flex items-center justify-center mb-6 shadow-lg ${activeModel === "fingenie" ? "animate-glow" : "bankora-animate-glow"}`}
            >
              {activeModel === "fingenie" ? (
                <Brain className="h-8 w-8 text-white" />
              ) : (
                <Database className="h-8 w-8 text-white" />
              )}
            </div>

            <h2 className="text-2xl font-bold mb-2">
              {activeModel === "fingenie" ? "Welcome to FinGenie" : "Welcome to Bankora-AI"}
            </h2>

            <p className="text-muted-foreground mb-8">
              {activeModel === "fingenie"
                ? "Your AI-powered banking assistant for financial knowledge and guidance."
                : "Get real-time information about banks in Ghana through AI-powered search."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
              {suggestedQuestions[activeModel].map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <Button
                    variant="outline"
                    className="justify-start h-auto py-3 px-4 text-left w-full hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-accent/50"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6 max-w-3xl mx-auto">
            <AnimatePresence>
              {conversationMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={messageVariants}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  layout
                  layoutId={message.id}
                  style={{
                    originX: message.role === "user" ? 1 : 0,
                    originY: 0.5,
                  }}
                  whileHover={{ scale: 1.01 }}
                  className={`${newMessageId === message.id ? "animate-pulse-once" : ""}`}
                >
                  <ContextMenu>
                    <ContextMenuTrigger>
                      <div className="flex items-start gap-3 max-w-[80%]">
                        {message.role === "assistant" && (
                          <Avatar
                            className={`h-8 w-8 ${activeModel === "fingenie" ? "fingenie-gradient" : "bankora-gradient"} shadow-md`}
                          >
                            <AvatarFallback className="text-primary-foreground">
                              {activeModel === "fingenie" ? "F" : "B"}
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div
                          className={`rounded-lg p-3 shadow-sm ${
                            message.role === "user"
                              ? activeModel === "fingenie"
                                ? "chat-bubble-user ml-auto"
                                : "bankora-chat-bubble-user ml-auto"
                              : "chat-bubble-ai backdrop-blur-sm bg-opacity-90"
                          }`}
                        >
                          {regeneratingIndex === index ? (
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <p>Regenerating response...</p>
                            </div>
                          ) : message.role === "assistant" ? (
                            <div
                              className={`markdown-content ${activeModel === "bankora" ? "bankora-markdown-content" : ""}`}
                            >
                              <ReactMarkdown>{message.content}</ReactMarkdown>
                            </div>
                          ) : (
                            <p>{message.content}</p>
                          )}
                        </div>

                        {message.role === "user" && (
                          <Avatar className="h-8 w-8 bg-primary shadow-md">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {user?.displayName
                                ? user.displayName.charAt(0).toUpperCase()
                                : user?.email?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem onClick={() => handleCopyMessage(message.content)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </ContextMenuItem>

                      {message.role === "user" && (
                        <>
                          <ContextMenuItem onClick={() => handleEditMessage(message)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </ContextMenuItem>
                          <ContextMenuSeparator />
                          <ContextMenuItem onClick={() => handleRegenerateResponse(index)}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Regenerate Response
                          </ContextMenuItem>
                        </>
                      )}
                    </ContextMenuContent>
                  </ContextMenu>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start gap-3 max-w-[80%]">
                  <Avatar
                    className={`h-8 w-8 ${activeModel === "fingenie" ? "fingenie-gradient" : "bankora-gradient"} shadow-md`}
                  >
                    <AvatarFallback className="text-primary-foreground">
                      {activeModel === "fingenie" ? "F" : "B"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="chat-bubble-ai rounded-lg p-3 shadow-sm backdrop-blur-sm bg-opacity-90">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p>{activeModel === "fingenie" ? "FinGenie" : "Bankora-AI"} is thinking...</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="border-t p-4 backdrop-blur-sm bg-background/80 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-end gap-2 max-w-3xl mx-auto"
        >
          <Textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={`Ask ${activeModel === "fingenie" ? "FinGenie" : "Bankora-AI"} a question...`}
            className="min-h-[60px] resize-none shadow-sm focus:shadow-md transition-shadow duration-300 bg-background/50 backdrop-blur-sm"
            disabled={isLoading || !activeConversationId}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading || !activeConversationId}
            className={`${activeModel === "fingenie" ? "" : "bg-[#3b82f6] hover:bg-[#2563eb]"} shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105`}
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizontal className="h-5 w-5" />}
          </Button>
        </motion.div>
      </div>

      {/* Edit Message Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Message</DialogTitle>
            <DialogDescription>Edit your message below. This will also regenerate the AI response.</DialogDescription>
          </DialogHeader>
          <Textarea
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            placeholder="Edit your message..."
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={!editInput.trim()}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

