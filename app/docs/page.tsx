"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FileText } from "lucide-react"
import { motion } from "framer-motion"
import { PdfExport } from "@/components/pdf-export"
import { MessageSquareIcon, DatabaseIcon, BarChartIcon, BrainIcon } from "lucide-react"

export default function DocsPage() {
  const [orientation, setOrientation] = useState("portrait")
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 hero-gradient -z-10" />
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="gradient-text">FinGenie</span> Documentation
            </motion.h1>
            <motion.p
              className="mt-4 text-muted-foreground md:text-xl/relaxed text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              A comprehensive guide to our AI-powered banking assistant
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-12" id="docs-content">
        <Tabs defaultValue="overview" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full max-w-3xl">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="mission">Mission</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="models">Models</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Project Overview</CardTitle>
                <CardDescription>Understanding FinGenie and its purpose</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-xl font-semibold">What is FinGenie?</h3>
                <p>
                  FinGenie is an AI-powered conversational banking assistant designed to simplify banking experiences
                  through natural language interactions. It combines advanced AI models with financial expertise to
                  provide instant answers to banking questions, track expenses, and offer personalized financial
                  insights.
                </p>

                <h3 className="text-xl font-semibold mt-6">Key Capabilities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Natural language conversations about banking and finance</li>
                  <li>Real-time information about Ghanaian banks</li>
                  <li>Expense tracking and financial management</li>
                  <li>Personalized financial insights and recommendations</li>
                  <li>Secure user authentication and data protection</li>
                </ul>

                <div className="rounded-lg border p-4 bg-muted/30 mt-6">
                  <h4 className="font-semibold">Target Audience</h4>
                  <p className="mt-2">
                    FinGenie is designed for individuals seeking to simplify their banking experience, gain financial
                    knowledge, and better manage their finances through an intuitive conversational interface.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Roadmap</CardTitle>
                <CardDescription>Future development plans for FinGenie</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Q1 2025</h3>
                    <div className="rounded-lg border p-3">
                      <h4 className="font-medium">Bank API Integration</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Direct integration with Ecobank and other major Ghanaian banks to access real-time account
                        information.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Q2 2025</h3>
                    <div className="rounded-lg border p-3">
                      <h4 className="font-medium">Transaction Management</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        View and manage your transactions directly through FinGenie with detailed analytics and
                        categorization.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Q3 2025</h3>
                    <div className="rounded-lg border p-3">
                      <h4 className="font-medium">Payment Capabilities</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Send money, pay bills, and make transfers directly through the conversational interface.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Q4 2025</h3>
                    <div className="rounded-lg border p-3">
                      <h4 className="font-medium">Enhanced Security</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Advanced biometric authentication and encryption for maximum security of your financial data.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Core Features</CardTitle>
                <CardDescription>Powerful capabilities of the FinGenie platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-lg border p-4 space-y-3">
                    <h3 className="text-lg font-semibold flex items-center">
                      <MessageSquareIcon className="h-5 w-5 mr-2 text-primary" />
                      Conversational AI
                    </h3>
                    <p className="text-muted-foreground">
                      Natural language interface for intuitive banking interactions. Ask questions about banking terms,
                      services, and financial concepts.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4 space-y-3">
                    <h3 className="text-lg font-semibold flex items-center">
                      <DatabaseIcon className="h-5 w-5 mr-2 text-primary" />
                      Bank Information
                    </h3>
                    <p className="text-muted-foreground">
                      Access up-to-date information about banks in Ghana through Bankora-AI, including services,
                      locations, and contact details.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4 space-y-3">
                    <h3 className="text-lg font-semibold flex items-center">
                      <BarChartIcon className="h-5 w-5 mr-2 text-primary" />
                      Expense Tracking
                    </h3>
                    <p className="text-muted-foreground">
                      Track and categorize expenses, visualize spending patterns, and gain insights into your financial
                      habits.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4 space-y-3">
                    <h3 className="text-lg font-semibold flex items-center">
                      <BrainIcon className="h-5 w-5 mr-2 text-primary" />
                      Financial Insights
                    </h3>
                    <p className="text-muted-foreground">
                      Receive personalized financial recommendations and insights based on your spending patterns and
                      goals.
                    </p>
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="text-xl font-semibold">Dashboard Features</h3>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium">Financial Overview</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get a comprehensive view of your financial status, including current balance, recent income, and
                      expenses.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium">Expense Analytics</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Visualize your spending by category and track monthly trends to identify areas for improvement.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium">Transaction Management</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add, view, and manage all your financial transactions in one place with detailed filtering and
                      search capabilities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">User Experience</CardTitle>
                <CardDescription>How FinGenie delivers a seamless banking experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-lg border p-4 space-y-2">
                    <h3 className="font-semibold">Intuitive Interface</h3>
                    <p className="text-sm text-muted-foreground">
                      Clean, modern design with easy navigation and responsive layout for all devices.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4 space-y-2">
                    <h3 className="font-semibold">Personalization</h3>
                    <p className="text-sm text-muted-foreground">
                      Customizable profiles and preferences to tailor the experience to individual needs.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4 space-y-2">
                    <h3 className="font-semibold">Accessibility</h3>
                    <p className="text-sm text-muted-foreground">
                      Designed with accessibility in mind, ensuring all users can benefit from FinGenie's features.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mission" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
                <CardDescription>Why we created FinGenie and what drives us</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  At FinGenie, we're on a mission to transform how people interact with their banking services.
                  Traditional banking apps often require users to navigate complex interfaces to access financial
                  information. Many users struggle with tracking expenses, managing savings, and making informed
                  financial decisions.
                </p>
                <p>
                  We believe that banking should be as simple as having a conversation. Our AI-powered assistant
                  provides instant answers to financial questions, helps track expenses, and offers personalized
                  financial advice - all through a natural, conversational interface.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="rounded-lg border p-4 space-y-2">
                    <h3 className="font-semibold">Simplify Banking</h3>
                    <p className="text-sm text-muted-foreground">
                      Make financial information accessible through natural conversation
                    </p>
                  </div>

                  <div className="rounded-lg border p-4 space-y-2">
                    <h3 className="font-semibold">Empower Users</h3>
                    <p className="text-sm text-muted-foreground">
                      Help people make better financial decisions with AI-powered insights
                    </p>
                  </div>

                  <div className="rounded-lg border p-4 space-y-2">
                    <h3 className="font-semibold">Bridge the Gap</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect users with their banks through intuitive AI interfaces
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Problem & Solution</CardTitle>
                <CardDescription>The banking challenges we're addressing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-destructive">The Problem</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-destructive font-bold mt-1">•</span>
                        <p>Complex banking interfaces that are difficult to navigate</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive font-bold mt-1">•</span>
                        <p>Difficulty tracking expenses and managing savings effectively</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive font-bold mt-1">•</span>
                        <p>Limited access to personalized financial advice</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive font-bold mt-1">•</span>
                        <p>Existing chatbots lack deep financial understanding</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive font-bold mt-1">•</span>
                        <p>Disconnected banking services that don't provide a unified experience</p>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-primary">Our Solution</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <p>Conversational AI interface that understands natural language</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <p>Specialized financial knowledge through our finetuned FinGenie model</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <p>Real-time banking information through Bankora-AI</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <p>Personalized financial insights and recommendations</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <p>Secure and private handling of financial information</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
                <CardDescription>Where we see FinGenie in the future</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our vision is to create a world where banking is accessible, intuitive, and personalized for everyone.
                  We envision FinGenie becoming an essential financial companion that not only answers questions but
                  proactively helps users achieve their financial goals.
                </p>

                <div className="rounded-lg border p-4 bg-muted/30 mt-4">
                  <h4 className="font-semibold">Future Vision</h4>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">•</span>
                      <p>Direct integration with major banks for real-time account management</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">•</span>
                      <p>AI-powered financial planning and wealth management</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">•</span>
                      <p>Voice-activated banking through multiple devices</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">•</span>
                      <p>Predictive financial insights based on spending patterns</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-1">•</span>
                      <p>Creating a financial ecosystem that works for everyone</p>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Story</CardTitle>
                <CardDescription>The journey behind FinGenie</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  FinGenie started as a project at Kwame Nkrumah University of Science and Technology (KNUST) by a group
                  of passionate computer science students who recognized the challenges people face with traditional
                  banking interfaces.
                </p>
                <p>
                  The team observed that while banking services were becoming increasingly digital, the user experience
                  remained complex and often frustrating. They envisioned a solution that would leverage the power of AI
                  to create a more intuitive and conversational banking experience.
                </p>
                <p>
                  After months of research and development, the team created a prototype of FinGenie, an AI-powered
                  conversational banking assistant that could understand and respond to natural language queries about
                  banking and finance.
                </p>

                <div className="rounded-lg border p-4 bg-muted/30 mt-4">
                  <h4 className="font-semibold">Evolution</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    As the project evolved, the team expanded FinGenie's capabilities by developing two specialized AI
                    models: the core FinGenie model for general banking and finance knowledge, and Bankora-AI for
                    real-time information about Ghanaian banks.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Today, FinGenie continues to evolve with ambitious plans to integrate directly with banking APIs,
                    enabling users to not only get information but also perform transactions through a simple,
                    conversational interface.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Team</CardTitle>
                <CardDescription>The talented individuals behind FinGenie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Management & Backend</h3>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Ampah Emily Maureen</h4>
                      <p className="text-sm text-muted-foreground mt-1">Project Manager & Backend Developer</p>
                      <p className="text-sm mt-2">
                        Leading the project and contributing to backend development with expertise in system
                        architecture and API design.
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Asaah Manasseh</h4>
                      <p className="text-sm text-muted-foreground mt-1">Backend Developer</p>
                      <p className="text-sm mt-2">
                        Building robust server-side applications and database integrations.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Frontend & Design</h3>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Dumashie Bruce Klenam</h4>
                      <p className="text-sm text-muted-foreground mt-1">Frontend Developer</p>
                      <p className="text-sm mt-2">
                        Specializing in creating responsive and intuitive user interfaces with modern web technologies.
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Nsiah Milcah Beatrice Owusuaa</h4>
                      <p className="text-sm text-muted-foreground mt-1">Frontend Developer</p>
                      <p className="text-sm mt-2">
                        Focused on creating seamless user experiences and implementing UI components.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold">Design & Quality Assurance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Basoah Barima Owusu</h4>
                      <p className="text-sm text-muted-foreground mt-1">UI/UX Designer</p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Elvis Fosu Owusu</h4>
                      <p className="text-sm text-muted-foreground mt-1">Machine Learning Engineer</p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Kusi James</h4>
                      <p className="text-sm text-muted-foreground mt-1">Quality Assurance Engineer</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg border bg-muted/30">
                  <h4 className="font-semibold">Our University</h4>
                  <p className="mt-2 text-sm">
                    We are proud students of Kwame Nkrumah University of Science and Technology (KNUST), one of Ghana's
                    premier institutions for technology education and innovation.
                  </p>
                  <p className="mt-2 text-sm">
                    As level 300 Computer Science students, we're applying our knowledge and skills to create solutions
                    that address real-world challenges in the banking sector.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our AI Models</CardTitle>
                <CardDescription>The technology powering FinGenie</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="rounded-lg border p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full fingenie-gradient flex items-center justify-center">
                        <BrainIcon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">FinGenie</h3>
                        <p className="text-sm text-muted-foreground">Specialized financial AI model</p>
                      </div>
                    </div>

                    <p>
                      FinGenie is a finetuned Gemini model specifically designed for banking and finance. It was trained
                      on Gemini 1.5 Flash 001 Tuning with a comprehensive dataset of 4,529 example questions and answers
                      revolving around banking.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-sm text-muted-foreground">Training Time</p>
                        <p className="text-lg font-semibold">2h 2m</p>
                      </div>

                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-sm text-muted-foreground">Dataset Size</p>
                        <p className="text-lg font-semibold">4,529 Q&A Pairs</p>
                      </div>
                    </div>

                    <h4 className="font-semibold mt-4">Key Capabilities</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <p className="text-sm">Answers detailed questions about banking products and services</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <p className="text-sm">Explains financial concepts and terminology</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <p className="text-sm">Provides guidance on banking procedures and requirements</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <p className="text-sm">Offers information on security practices and fraud prevention</p>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bankora-gradient flex items-center justify-center">
                        <DatabaseIcon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Bankora-AI</h3>
                        <p className="text-sm text-muted-foreground">Real-time banking information</p>
                      </div>
                    </div>

                    <p>
                      Bankora-AI is a specialized system that provides up-to-date information about banks in Ghana.
                      Unlike FinGenie, which is a finetuned model, Bankora-AI works by combining search capabilities
                      with AI processing to deliver accurate and current information.
                    </p>

                    <div className="rounded-lg border p-4 bg-muted/30 mt-4">
                      <h4 className="font-semibold">How Bankora-AI Works</h4>
                      <ol className="mt-2 space-y-2 pl-5 text-sm">
                        <li>
                          <span className="font-medium">Query Analysis:</span> When you ask a question about a Ghanaian
                          bank, Bankora-AI identifies which bank you're referring to.
                        </li>
                        <li>
                          <span className="font-medium">Information Retrieval:</span> It uses SerpAPI to search for the
                          most current information about that bank.
                        </li>
                        <li>
                          <span className="font-medium">AI Processing:</span> The retrieved information is processed by
                          Gemini 1.5 Flash to generate a comprehensive response.
                        </li>
                        <li>
                          <span className="font-medium">Response Delivery:</span> You receive accurate, up-to-date
                          information about the bank's services, locations, or other details.
                        </li>
                      </ol>
                    </div>

                    <h4 className="font-semibold mt-4">Key Capabilities</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="text-[#3b82f6] font-bold mt-1">•</span>
                        <p className="text-sm">Provides current information about Ghanaian banks</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#3b82f6] font-bold mt-1">•</span>
                        <p className="text-sm">Answers questions about bank services, locations, and products</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#3b82f6] font-bold mt-1">•</span>
                        <p className="text-sm">Delivers real-time data through search integration</p>
                      </li>
                    </ul>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="rounded-lg border p-6">
                  <h3 className="text-xl font-semibold mb-4">Model Comparison</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4">Feature</th>
                          <th className="text-left py-2 px-4">FinGenie</th>
                          <th className="text-left py-2 px-4">Bankora-AI</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">AI Model Type</td>
                          <td className="py-2 px-4">Finetuned Gemini 1.5 Flash</td>
                          <td className="py-2 px-4">Gemini 1.5 Flash with search integration</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">Primary Focus</td>
                          <td className="py-2 px-4">General banking and finance knowledge</td>
                          <td className="py-2 px-4">Specific information about Ghanaian banks</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">Information Currency</td>
                          <td className="py-2 px-4">Based on training data</td>
                          <td className="py-2 px-4">Up-to-date through web search</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4 font-medium">Best For</td>
                          <td className="py-2 px-4">General banking questions and concepts</td>
                          <td className="py-2 px-4">Questions about specific Ghanaian banks</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-muted/30">
                    <h4 className="font-semibold">When to Use Each Model</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full fingenie-gradient flex items-center justify-center">
                            <span className="text-xs font-bold text-white">F</span>
                          </div>
                          <p className="font-medium">Use FinGenie when:</p>
                        </div>
                        <ul className="mt-2 space-y-1 pl-8 text-sm">
                          <li className="list-disc">You have general banking questions</li>
                          <li className="list-disc">You need to understand financial concepts</li>
                          <li className="list-disc">You want information about banking procedures</li>
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bankora-gradient flex items-center justify-center">
                            <span className="text-xs font-bold text-white">B</span>
                          </div>
                          <p className="font-medium">Use Bankora-AI when:</p>
                        </div>
                        <ul className="mt-2 space-y-1 pl-8 text-sm">
                          <li className="list-disc">You need information about a specific Ghanaian bank</li>
                          <li className="list-disc">You want to know about current bank services</li>
                          <li className="list-disc">You're looking for branch locations or contact information</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="container px-4 md:px-6 py-8 flex justify-center">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              Export Documentation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Export Documentation</DialogTitle>
              <DialogDescription>Choose your preferred export format and orientation.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="orientation" className="text-right">
                  Orientation
                </Label>
                <Select value={orientation} onValueChange={setOrientation} defaultValue="portrait">
                  <SelectTrigger id="orientation" className="col-span-3">
                    <SelectValue placeholder="Select orientation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portrait">Portrait</SelectItem>
                    <SelectItem value="landscape">Landscape</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <PdfExport contentId="docs-content" orientation={orientation as "portrait" | "landscape"} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Footer />
    </main>
  )
}

