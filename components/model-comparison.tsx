"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, XCircle } from "lucide-react"

export default function ModelComparison() {
  const comparisonData = [
    {
      feature: "AI Model Type",
      fingenie: "Finetuned Gemini 1.5 Flash",
      bankora: "Gemini 1.5 Flash with search integration",
    },
    {
      feature: "Primary Focus",
      fingenie: "General banking and finance knowledge",
      bankora: "Specific information about Ghanaian banks",
    },
    {
      feature: "Data Source",
      fingenie: "Trained on 4,529 banking Q&A pairs",
      bankora: "Real-time web search via SerpAPI",
    },
    {
      feature: "Information Currency",
      fingenie: "Based on training data",
      bankora: "Up-to-date through web search",
    },
    {
      feature: "Response Generation",
      fingenie: "Direct model output",
      bankora: "Search results processed by AI",
    },
    {
      feature: "Specialized Knowledge",
      fingenie: "Deep understanding of banking concepts",
      bankora: "Current information about specific banks",
    },
    {
      feature: "Best For",
      fingenie: "General banking questions and concepts",
      bankora: "Questions about specific Ghanaian banks",
    },
  ]

  const featureComparison = [
    {
      feature: "Banking Terminology",
      fingenie: true,
      bankora: false,
    },
    {
      feature: "Financial Concepts",
      fingenie: true,
      bankora: false,
    },
    {
      feature: "Security Practices",
      fingenie: true,
      bankora: false,
    },
    {
      feature: "Bank-Specific Services",
      fingenie: false,
      bankora: true,
    },
    {
      feature: "Current Bank Information",
      fingenie: false,
      bankora: true,
    },
    {
      feature: "Branch Locations",
      fingenie: false,
      bankora: true,
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Model Comparison</h2>
          <p className="mt-4 text-muted-foreground md:text-lg/relaxed">
            Understanding the differences between FinGenie and Bankora-AI to get the most out of each model
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardContent className="p-6 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Feature</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full fingenie-gradient flex items-center justify-center">
                          <span className="text-xs font-bold text-white">F</span>
                        </div>
                        <span>FinGenie</span>
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bankora-gradient flex items-center justify-center">
                          <span className="text-xs font-bold text-white">B</span>
                        </div>
                        <span>Bankora-AI</span>
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row.feature}</TableCell>
                      <TableCell>{row.fingenie}</TableCell>
                      <TableCell>{row.bankora}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6">Specialized Capabilities</h3>
              <div className="space-y-4">
                {featureComparison.map((item, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 items-center">
                    <div className="font-medium">{item.feature}</div>
                    <div className="flex justify-center">
                      {item.fingenie ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex justify-center">
                      {item.bankora ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">When to Use Each Model</h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full fingenie-gradient flex items-center justify-center">
                      <span className="text-xs font-bold text-white">F</span>
                    </div>
                    <h4 className="font-semibold">Use FinGenie when:</h4>
                  </div>
                  <ul className="space-y-2 pl-8">
                    <li className="list-disc">You have general banking questions</li>
                    <li className="list-disc">You need to understand financial concepts</li>
                    <li className="list-disc">You want information about banking procedures</li>
                    <li className="list-disc">You need help with security practices</li>
                    <li className="list-disc">You're looking for explanations of banking terminology</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bankora-gradient flex items-center justify-center">
                      <span className="text-xs font-bold text-white">B</span>
                    </div>
                    <h4 className="font-semibold">Use Bankora-AI when:</h4>
                  </div>
                  <ul className="space-y-2 pl-8">
                    <li className="list-disc">You need information about a specific Ghanaian bank</li>
                    <li className="list-disc">You want to know about current bank services</li>
                    <li className="list-disc">You're looking for branch locations or contact information</li>
                    <li className="list-disc">You need up-to-date information that might have changed recently</li>
                    <li className="list-disc">You want to compare services between Ghanaian banks</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground md:text-lg/relaxed max-w-2xl mx-auto">
            Both models work together to provide a comprehensive banking assistant experience. Switch between them based
            on your specific needs to get the most accurate and helpful information.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

