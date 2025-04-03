"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, updateProfile } from "firebase/auth"
import AppSidebar from "@/components/app-sidebar"
import { Loader2, User, Mail, Phone, Home, Briefcase, DollarSign, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { getUserProfile, updateUserProfile } from "@/lib/expense-api"
import type { UserProfile } from "@/types/expense"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    displayName: "",
    phoneNumber: "",
    address: "",
    occupation: "",
    monthlyIncome: "",
    savingsGoal: "",
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/")
      } else {
        setUser(currentUser)
        fetchProfile(currentUser.uid)
      }
    })

    return () => unsubscribe()
  }, [router])

  const fetchProfile = async (userId: string) => {
    setLoading(true)
    try {
      const result = await getUserProfile(userId)
      if (result.success && result.profile) {
        setProfile(result.profile)
        setFormData({
          displayName: result.profile.displayName || user?.displayName || "",
          phoneNumber: result.profile.phoneNumber || "",
          address: result.profile.address || "",
          occupation: result.profile.occupation || "",
          monthlyIncome: result.profile.monthlyIncome?.toString() || "",
          savingsGoal: result.profile.savingsGoal?.toString() || "",
        })
      } else {
        // Initialize with user data if profile doesn't exist
        setFormData({
          displayName: user?.displayName || "",
          phoneNumber: "",
          address: "",
          occupation: "",
          monthlyIncome: "",
          savingsGoal: "",
        })
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    try {
      // Update Firebase Auth profile
      if (formData.displayName !== user.displayName) {
        await updateProfile(user, {
          displayName: formData.displayName,
        })
      }

      // Update Firestore profile
      const profileData: Partial<UserProfile> = {
        displayName: formData.displayName,
        email: user.email,
        photoURL: user.photoURL,
        phoneNumber: formData.phoneNumber || null,
        address: formData.address || null,
        occupation: formData.occupation || null,
        monthlyIncome: formData.monthlyIncome ? Number.parseFloat(formData.monthlyIncome) : null,
        savingsGoal: formData.savingsGoal ? Number.parseFloat(formData.savingsGoal) : null,
      }

      const result = await updateUserProfile(user.uid, profileData)

      if (result.success) {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        })
        fetchProfile(user.uid)
        setIsEditing(false)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading && !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <main className="flex h-screen overflow-hidden">
      <AppSidebar />
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="container py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">My Profile</h1>
            {!isEditing && <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardContent className="pt-6 flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "User"} />
                  <AvatarFallback className="text-4xl">
                    {user?.displayName
                      ? user.displayName.charAt(0).toUpperCase()
                      : user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user?.displayName || "User"}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Member since {new Date(user?.metadata?.creationTime).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  {isEditing ? "Edit your personal information" : "Your personal information"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Full Name</Label>
                        <div className="flex">
                          <User className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Input
                            id="displayName"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <div className="flex">
                          <Phone className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Your phone number"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <div className="flex">
                          <Home className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Your address"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="occupation">Occupation</Label>
                        <div className="flex">
                          <Briefcase className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Input
                            id="occupation"
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleInputChange}
                            placeholder="Your occupation"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="monthlyIncome">Monthly Income (GH₵)</Label>
                        <div className="flex">
                          <DollarSign className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Input
                            id="monthlyIncome"
                            name="monthlyIncome"
                            type="number"
                            value={formData.monthlyIncome}
                            onChange={handleInputChange}
                            placeholder="Your monthly income"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="savingsGoal">Savings Goal (GH₵)</Label>
                        <div className="flex">
                          <Target className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Input
                            id="savingsGoal"
                            name="savingsGoal"
                            type="number"
                            value={formData.savingsGoal}
                            onChange={handleInputChange}
                            placeholder="Your savings goal"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Save Changes
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4 text-muted-foreground" />
                          <p>{profile?.displayName || user?.displayName || "Not set"}</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Email</p>
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                          <p>{user?.email}</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Phone Number</p>
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                          <p>{profile?.phoneNumber || "Not set"}</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Address</p>
                        <div className="flex items-center">
                          <Home className="mr-2 h-4 w-4 text-muted-foreground" />
                          <p>{profile?.address || "Not set"}</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Occupation</p>
                        <div className="flex items-center">
                          <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                          <p>{profile?.occupation || "Not set"}</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Monthly Income</p>
                        <div className="flex items-center">
                          <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                          <p>{profile?.monthlyIncome ? `GH₵ ${profile.monthlyIncome.toFixed(2)}` : "Not set"}</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Savings Goal</p>
                        <div className="flex items-center">
                          <Target className="mr-2 h-4 w-4 text-muted-foreground" />
                          <p>{profile?.savingsGoal ? `GH₵ ${profile.savingsGoal.toFixed(2)}` : "Not set"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

