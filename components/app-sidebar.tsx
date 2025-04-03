"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useModelStore } from "@/lib/stores/model-store"
import { useChatStore } from "@/lib/stores/chat-store"
import type { UserConversation } from "@/types/chat"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Brain,
  ChevronLeft,
  Database,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  Trash2,
  MoreVertical,
  Edit,
  LayoutDashboard,
  User,
  Settings,
} from "lucide-react"
import { saveConversation, getUserConversations, deleteConversation, updateConversationTitle } from "@/lib/api"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function AppSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const { activeModel, setActiveModel } = useModelStore()
  const { activeConversationId, setActiveConversationId } = useChatStore()
  const [isOpen, setIsOpen] = useState(true)
  const [fingenieConversations, setFingenieConversations] = useState<UserConversation[]>([])
  const [bankoraConversations, setBankoraConversations] = useState<UserConversation[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState<UserConversation | null>(null)
  const [newTitle, setNewTitle] = useState("")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        fetchConversations(currentUser.uid)
      } else {
        router.push("/")
      }
    })

    return () => unsubscribe()
  }, [router])

  // Add a new useEffect to create a conversation if none exists
  useEffect(() => {
    if (user && !activeConversationId && !loading) {
      // If user is logged in, no active conversation, and conversations are loaded
      if (
        (activeModel === "fingenie" && fingenieConversations.length === 0) ||
        (activeModel === "bankora" && bankoraConversations.length === 0)
      ) {
        // Create a new conversation automatically
        handleNewChat()
      }
    }
  }, [user, activeConversationId, loading, fingenieConversations, bankoraConversations, activeModel])

  const fetchConversations = async (userId: string) => {
    setLoading(true)
    try {
      const result = await getUserConversations(userId)

      if (result.success) {
        setFingenieConversations(result.conversations.fingenie)
        setBankoraConversations(result.conversations.bankora)

        // Always set the active conversation when fetching conversations
        if (activeModel === "fingenie" && result.conversations.fingenie.length > 0) {
          setActiveConversationId(result.conversations.fingenie[0].id)
        } else if (activeModel === "bankora" && result.conversations.bankora.length > 0) {
          setActiveConversationId(result.conversations.bankora[0].id)
        } else {
          // No conversations for the current model
          setActiveConversationId(null)
        }
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Error fetching conversations:", error)
      toast({
        title: "Error",
        description: "Failed to load conversations",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      })
    }
  }

  const handleModelChange = (value: string) => {
    setActiveModel(value as "fingenie" | "bankora")
    setActiveConversationId(null)

    // Ensure we're on the chat interface
    if (pathname !== "/app") {
      router.push("/app")
    }
  }

  const handleNewChat = async () => {
    if (!user) return

    try {
      const title = activeModel === "fingenie" ? "New FinGenie Conversation" : "New Bankora-AI Conversation"

      const result = await saveConversation(user.uid, activeModel, title)

      if (result.success) {
        toast({
          title: "Success",
          description: "New conversation created",
        })

        // Refresh conversations
        fetchConversations(user.uid)

        // Set the new conversation as active
        setActiveConversationId(result.conversationId)

        // Navigate to chat interface if not already there
        if (pathname !== "/app") {
          router.push("/app")
        }
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Error creating new conversation:", error)
      toast({
        title: "Error",
        description: "Failed to create new conversation",
        variant: "destructive",
      })
    }
  }

  const handleSelectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId)

    // Navigate to chat interface if not already there
    if (pathname !== "/app") {
      router.push("/app")
    }
  }

  const handleEditConversation = (conversation: UserConversation) => {
    setSelectedConversation(conversation)
    setNewTitle(conversation.title)
    setIsEditDialogOpen(true)
  }

  const handleDeleteConversation = (conversation: UserConversation) => {
    setSelectedConversation(conversation)
    setIsDeleteDialogOpen(true)
  }

  const confirmEditConversation = async () => {
    if (!user || !selectedConversation || !newTitle.trim()) return

    try {
      const result = await updateConversationTitle(user.uid, selectedConversation.id, newTitle)

      if (result.success) {
        toast({
          title: "Success",
          description: "Conversation title updated",
        })

        // Refresh conversations
        fetchConversations(user.uid)

        // Close dialog
        setIsEditDialogOpen(false)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Error updating conversation title:", error)
      toast({
        title: "Error",
        description: "Failed to update conversation title",
        variant: "destructive",
      })
    }
  }

  const confirmDeleteConversation = async () => {
    if (!user || !selectedConversation) return

    try {
      const result = await deleteConversation(user.uid, selectedConversation.id)

      if (result.success) {
        toast({
          title: "Success",
          description: "Conversation deleted",
        })

        // If the deleted conversation was active, clear the active conversation
        if (activeConversationId === selectedConversation.id) {
          setActiveConversationId(null)
        }

        // Refresh conversations
        fetchConversations(user.uid)

        // Close dialog
        setIsDeleteDialogOpen(false)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Error deleting conversation:", error)
      toast({
        title: "Error",
        description: "Failed to delete conversation",
        variant: "destructive",
      })
    }
  }

  const navigateTo = (path: string) => {
    router.push(path)
    if (window.innerWidth < 768) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-background border-r transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full fingenie-gradient">
                  <div className="absolute inset-0.5 rounded-full bg-background dark:bg-card"></div>
                  <div className="absolute inset-2 rounded-full fingenie-gradient"></div>
                </div>
                <span className="text-xl font-bold">FinGenie</span>
              </Link>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(false)}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>

            <Tabs defaultValue="fingenie" value={activeModel} onValueChange={handleModelChange} className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="fingenie" className="flex items-center gap-1">
                  <Brain className="h-4 w-4" />
                  <span>FinGenie</span>
                </TabsTrigger>
                <TabsTrigger value="bankora" className="flex items-center gap-1">
                  <Database className="h-4 w-4" />
                  <span>Bankora</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button onClick={handleNewChat} className="mt-4 w-full">
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </div>

          <ScrollArea className="flex-1 px-3 py-2">
            {loading ? (
              <div className="flex items-center justify-center h-20">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                {activeModel === "fingenie" ? (
                  fingenieConversations.length > 0 ? (
                    <div className="space-y-1">
                      {fingenieConversations.map((conversation) => (
                        <div key={conversation.id} className="flex items-center group">
                          <button
                            onClick={() => handleSelectConversation(conversation.id)}
                            className={`flex-1 flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                              activeConversationId === conversation.id
                                ? "bg-accent text-accent-foreground"
                                : "hover:bg-accent/50"
                            }`}
                          >
                            <MessageSquare className="h-4 w-4 shrink-0" />
                            <span className="truncate">{conversation.title}</span>
                          </button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditConversation(conversation)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Rename
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteConversation(conversation)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-center px-4">
                      <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No FinGenie conversations yet</p>
                      <p className="text-xs text-muted-foreground mt-1">Start a new chat to begin</p>
                    </div>
                  )
                ) : bankoraConversations.length > 0 ? (
                  <div className="space-y-1">
                    {bankoraConversations.map((conversation) => (
                      <div key={conversation.id} className="flex items-center group">
                        <button
                          onClick={() => handleSelectConversation(conversation.id)}
                          className={`flex-1 flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                            activeConversationId === conversation.id
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-accent/50"
                          }`}
                        >
                          <MessageSquare className="h-4 w-4 shrink-0" />
                          <span className="truncate">{conversation.title}</span>
                        </button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditConversation(conversation)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteConversation(conversation)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 text-center px-4">
                    <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No Bankora-AI conversations yet</p>
                    <p className="text-xs text-muted-foreground mt-1">Start a new chat to begin</p>
                  </div>
                )}
              </>
            )}
          </ScrollArea>

          <div className="border-t pt-4 px-3">
            <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2">Navigation</h3>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className={`w-full justify-start ${pathname === "/app" ? "bg-accent text-accent-foreground" : ""}`}
                onClick={() => navigateTo("/app")}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${pathname === "/app/dashboard" ? "bg-accent text-accent-foreground" : ""}`}
                onClick={() => navigateTo("/app/dashboard")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${pathname === "/app/profile" ? "bg-accent text-accent-foreground" : ""}`}
                onClick={() => navigateTo("/app/profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${pathname === "/app/settings" ? "bg-accent text-accent-foreground" : ""}`}
                onClick={() => navigateTo("/app/settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>

          <div className="border-t p-4">
            {user && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.displayName
                        ? user.displayName.charAt(0).toUpperCase()
                        : user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-medium truncate max-w-[120px]">{user.displayName || user.email}</div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sign out">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 z-30 bg-background md:hidden" onClick={() => setIsOpen(false)} />}

      {/* Edit Conversation Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Conversation</DialogTitle>
            <DialogDescription>Enter a new title for this conversation.</DialogDescription>
          </DialogHeader>
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Conversation title"
            className="mt-4"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmEditConversation} disabled={!newTitle.trim()}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Conversation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Conversation</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this conversation? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteConversation}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

