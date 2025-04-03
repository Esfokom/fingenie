"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, Database, FileText, MessageSquare, Search } from "lucide-react"

export default function FinGenieModel() {
  const topicQuestions = {
    "Secure Transactions & Payments": [
      "What details are required when I want to perform a secure IVR transaction?",
      "Can the OTP be generated prior to the transaction?",
      "Is it necessary to register the card for an OTP transaction?",
    ],
    "Account Security & Passwords": [
      "How do I register my mobile number for IVR password?",
      "What is the Verified by Visa (VBV) password?",
      "What if I forget my prepaid net banking login password?",
    ],
    "Authentication & OTP": [
      "On which mobile number will I receive the OTP?",
      "What is the validity period of the OTP?",
    ],
    "Bank Accounts & Management": [
      "If my account is blocked, how do I unblock it?",
      "What are the special privileges that HDFC bank account holders can avail of?",
      "Do I get statements for my account?",
    ],
    "Debit & Credit Cards": [
      "How do I register my HDFC bank card?",
      "While trying to register my card, I am getting a mobile number mismatch error. What could be the reason?",
    ],
    "Loans & Credit": [
      "What security do I need to provide to obtain a business loan?",
      "How do I repay my business loan?",
    ],
    "Insurance & Policies": ["Can I get finance for insurance and registration?", "Why do I need health insurance?"],
    "Transaction Limits & Restrictions": [
      "When will my smart draft limit be renewed?",
      "Is there an age limit for opting for a personal accident plan?",
    ],
    "Banking Rates & Interest": [
      "How can I avail exemption from TDS on interest earned on fixed deposits?",
      "Will TDS be charged on the gross or net interest earned?",
    ],
    "IVR & Mobile Banking": ["Are all IVR-based calls free?"],
    "Reservations & Booking": ["Will the Rs.750 discount voucher be applicable only on Jet Airways bookings?"],
    "Payments & Refunds": ["Can I get a refund for residual forex on my return?"],
    "Legal & Contracts": ["What type of contracts does the company use to mitigate the risks in energy prices?"],
    "Entertainment & Events": ["What is the seating capacity of the theater at The Parisian Macao?"],
    "Fraud & Security": ["What U.S. laws pertain to healthcare fraud and abuse?"],
    "Other Banking Queries": ["Where do I find the CVV2?", "What is amortization?"],
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full fingenie-gradient flex items-center justify-center">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tighter">FinGenie</h2>
                <p className="text-muted-foreground">Our specialized financial AI model</p>
              </div>
            </div>

            <p className="text-muted-foreground md:text-lg/relaxed">
              FinGenie is a finetuned Gemini model specifically designed for banking and finance. It was trained on
              Gemini 1.5 Flash 001 Tuning with a comprehensive dataset of 4,529 example questions and answers revolving
              around banking.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Clock className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold">Training Time</h3>
                  <p className="text-2xl font-bold">2h 2m</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Database className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold">Dataset Size</h3>
                  <p className="text-2xl font-bold">4,529</p>
                  <p className="text-xs text-muted-foreground">Q&A Pairs</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold">Epochs</h3>
                  <p className="text-2xl font-bold">5</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Search className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold">Learning Rate</h3>
                  <p className="text-2xl font-bold">0.0002</p>
                </CardContent>
              </Card>
            </div>

            <p className="text-muted-foreground">
              The name "FinGenie" combines "Finance" and "Genie" - like a magical genie for all your financial
              questions. It's designed to understand and respond to a wide range of banking and finance queries with
              accuracy and depth.
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Key Capabilities</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <p>Answers detailed questions about banking products and services</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <p>Explains financial concepts and terminology</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <p>Provides guidance on banking procedures and requirements</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <p>Offers information on security practices and fraud prevention</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <p>Assists with understanding account management and transactions</p>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue="topics" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="topics">Topics</TabsTrigger>
                <TabsTrigger value="examples">Example Questions</TabsTrigger>
                <TabsTrigger value="demo">Demo</TabsTrigger>
              </TabsList>

              <TabsContent value="topics" className="mt-6 space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Training Dataset Topics</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {Object.keys(topicQuestions).map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      {Object.entries(topicQuestions).map(([topic, questions], index) => (
                        <AccordionItem key={index} value={`topic-${index}`}>
                          <AccordionTrigger className="text-left">{topic}</AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2 pl-4">
                              {questions.map((question, qIndex) => (
                                <li key={qIndex} className="text-sm text-muted-foreground list-disc ml-2">
                                  {question}
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="examples" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Example Questions</h3>
                    <p className="text-muted-foreground mb-6">
                      Here are some examples of questions you can ask FinGenie:
                    </p>

                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border">
                        <p className="font-medium">What is a banking API?</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Learn about application programming interfaces that connect financial applications to banking
                          systems.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg border">
                        <p className="font-medium">How do I protect my online banking account from fraud?</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Get security tips and best practices for keeping your online banking secure.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg border">
                        <p className="font-medium">
                          What's the difference between a savings account and a fixed deposit?
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Understand the key differences between various banking products.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg border">
                        <p className="font-medium">How does compound interest work?</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Learn about financial concepts and how they affect your savings and investments.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg border">
                        <p className="font-medium">What documents do I need to open a business account?</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Get information about banking procedures and requirements.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="demo" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">FinGenie in Action</h3>
                    <p className="text-muted-foreground mb-6">See how FinGenie responds to real banking questions:</p>

                    <div className="rounded-lg border overflow-hidden">
                      <div className="bg-muted p-4 border-b">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-500" />
                          <div className="h-3 w-3 rounded-full bg-yellow-500" />
                          <div className="h-3 w-3 rounded-full bg-green-500" />
                          <div className="ml-2 text-xs font-medium">FinGenie Chat Demo</div>
                        </div>
                      </div>

                      <div className="p-6 space-y-4 bg-background">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full fingenie-gradient flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-white" />
                          </div>
                          <div className="chat-bubble-ai rounded-lg p-3 flex-1">
                            <p>
                              Hello! I'm FinGenie, your AI banking assistant. How can I help you with your financial
                              questions today?
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 justify-end">
                          <div className="chat-bubble-user rounded-lg p-3">
                            <p>What is a banking API?</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full fingenie-gradient flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-white" />
                          </div>
                          <div className="chat-bubble-ai rounded-lg p-3 flex-1">
                            <p>
                              A banking API is an application programming interface that connects financial applications
                              to a consumer's checking account, allowing access to data and triggering real-time
                              payments and other capabilities.
                            </p>
                            <p className="mt-2">
                              It provides access to payment initiation capabilities through account access, enabling
                              account holders to initiate payments directly from their checking accounts. This means
                              users can control where, when, and how they pay, and they are not required to use P2P
                              services anymore.
                            </p>
                            <p className="mt-2">
                              Additionally, payment data from third party providers can be shared with financial
                              institutions, allowing easier reconciliation and providing a real-time view into the
                              customer's financial position.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 justify-end">
                          <div className="chat-bubble-user rounded-lg p-3">
                            <p>How do I protect my online banking from fraud?</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full fingenie-gradient flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-white" />
                          </div>
                          <div className="chat-bubble-ai rounded-lg p-3 flex-1">
                            <p>To protect your online banking from fraud, follow these important security practices:</p>
                            <ol className="mt-2 space-y-1 list-decimal pl-5">
                              <li>Use strong, unique passwords and change them regularly</li>
                              <li>Enable two-factor authentication whenever available</li>
                              <li>Never share your OTP or password with anyone, including bank staff</li>
                              <li>Always check for secure website connections (https://)</li>
                              <li>Monitor your accounts regularly for suspicious activity</li>
                              <li>Be cautious of phishing emails or calls asking for your banking details</li>
                              <li>Use updated antivirus software on your devices</li>
                              <li>Avoid using public Wi-Fi for banking transactions</li>
                            </ol>
                            <p className="mt-2">
                              If you notice any suspicious activity, contact your bank immediately to report it.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

