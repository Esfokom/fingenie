"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Building, Database, Globe, MessageSquare, Search, Brain } from "lucide-react"

export default function BankoraModel() {
  const ghanaianBanks = [
    "GCB Bank",
    "Absa Bank Ghana",
    "Stanbic Bank",
    "Zenith Bank",
    "Ecobank Ghana",
    "Fidelity Bank",
    "CalBank",
    "Standard Chartered",
    "UBA Ghana",
    "Access Bank",
    "Republic Bank",
    "First National Bank",
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/30">
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
              <div className="h-16 w-16 rounded-full bankora-gradient flex items-center justify-center">
                <Database className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tighter">Bankora-AI</h2>
                <p className="text-muted-foreground">Real-time Ghanaian banking information</p>
              </div>
            </div>

            <p className="text-muted-foreground md:text-lg/relaxed">
              Bankora-AI is a specialized system that provides up-to-date information about banks in Ghana. Unlike
              FinGenie, which is a finetuned model, Bankora-AI works by combining search capabilities with AI processing
              to deliver accurate and current information.
            </p>

            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">How Bankora-AI Works</h3>
              <ol className="space-y-4 pl-5 list-decimal">
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Query Analysis:</span> When you ask a question about a
                  Ghanaian bank, Bankora-AI identifies which bank you're referring to.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Information Retrieval:</span> It uses SerpAPI to search
                  for the most current information about that bank.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">AI Processing:</span> The retrieved information is
                  processed by Gemini 1.5 Flash to generate a comprehensive and coherent response.
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium text-foreground">Response Delivery:</span> You receive accurate,
                  up-to-date information about the bank's services, locations, or other details you requested.
                </li>
              </ol>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Supported Banks</h3>
              <div className="flex flex-wrap gap-2">
                {ghanaianBanks.map((bank, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {bank}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Key Capabilities</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#3b82f6] font-bold mt-1">•</span>
                  <p>Provides current information about Ghanaian banks</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3b82f6] font-bold mt-1">•</span>
                  <p>Answers questions about bank services, locations, and products</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3b82f6] font-bold mt-1">•</span>
                  <p>Delivers real-time data through search integration</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3b82f6] font-bold mt-1">•</span>
                  <p>Processes information intelligently to provide relevant answers</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#3b82f6] font-bold mt-1">•</span>
                  <p>Stays updated with the latest banking information in Ghana</p>
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
            <Tabs defaultValue="demo" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="demo">Demo</TabsTrigger>
                <TabsTrigger value="code">How It Works</TabsTrigger>
              </TabsList>

              <TabsContent value="demo" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Bankora-AI in Action</h3>
                    <p className="text-muted-foreground mb-6">
                      See how Bankora-AI provides information about Ghanaian banks:
                    </p>

                    <div className="mb-6">
                      <label className="text-sm font-medium mb-2 block">Select a bank to learn about:</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a bank" />
                        </SelectTrigger>
                        <SelectContent>
                          {ghanaianBanks.map((bank, index) => (
                            <SelectItem key={index} value={bank.toLowerCase().replace(/\s+/g, "-")}>
                              {bank}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="rounded-lg border overflow-hidden">
                      <div className="bg-muted p-4 border-b">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-500" />
                          <div className="h-3 w-3 rounded-full bg-yellow-500" />
                          <div
                            className="h-3 w-3 rounded-full bg-
green-500"
                          />
                          <div className="ml-2 text-xs font-medium">Bankora-AI Chat Demo</div>
                        </div>
                      </div>

                      <div className="p-6 space-y-4 bg-background">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bankora-gradient flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-white" />
                          </div>
                          <div className="chat-bubble-ai rounded-lg p-3 flex-1">
                            <p>
                              Hello! I'm Bankora-AI. I can provide you with information about banks in Ghana. Which bank
                              would you like to learn about?
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 justify-end">
                          <div className="bankora-chat-bubble-user rounded-lg p-3">
                            <p>Tell me about Ecobank Ghana services</p>
                          </div>
                        </div>

                        <div className="flex justify-center my-4">
                          <div className="px-4 py-2 rounded-full bg-muted text-xs font-medium flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#3b82f6]"></span>
                            </span>
                            Searching for latest information...
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bankora-gradient flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-white" />
                          </div>
                          <div className="chat-bubble-ai rounded-lg p-3 flex-1">
                            <p>
                              Ecobank Ghana offers a comprehensive range of banking services for individuals,
                              businesses, and corporate clients:
                            </p>

                            <p className="mt-2 font-semibold">Personal Banking Services:</p>
                            <ul className="list-disc pl-5 space-y-1 mt-1">
                              <li>Current and savings accounts</li>
                              <li>Fixed deposit accounts</li>
                              <li>Personal loans and mortgages</li>
                              <li>Credit and debit cards</li>
                              <li>Mobile banking via Ecobank Mobile App</li>
                              <li>Internet banking</li>
                              <li>Rapid Transfer for international money transfers</li>
                            </ul>

                            <p className="mt-2 font-semibold">Business Banking Services:</p>
                            <ul className="list-disc pl-5 space-y-1 mt-1">
                              <li>Business accounts</li>
                              <li>Business loans and overdrafts</li>
                              <li>Trade finance solutions</li>
                              <li>Cash management services</li>
                              <li>Ecobank Business Online for corporate clients</li>
                              <li>Point of Sale (POS) terminals</li>
                              <li>Foreign exchange services</li>
                            </ul>

                            <p className="mt-2">
                              Ecobank Ghana is part of the Ecobank Group, which operates in multiple African countries,
                              making it convenient for cross-border banking within Africa.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 justify-end">
                          <div className="bankora-chat-bubble-user rounded-lg p-3">
                            <p>How many branches does Ecobank have in Ghana?</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bankora-gradient flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-white" />
                          </div>
                          <div className="chat-bubble-ai rounded-lg p-3 flex-1">
                            <p>
                              Ecobank Ghana has an extensive network of branches across the country. As of my latest
                              information, Ecobank Ghana operates approximately 67 branches nationwide, covering all
                              major cities and many smaller towns.
                            </p>
                            <p className="mt-2">
                              In addition to their physical branches, they also have a wide ATM network and digital
                              banking channels that allow customers to access banking services without visiting a
                              branch.
                            </p>
                            <p className="mt-2">
                              For the most current information about specific branch locations, I recommend checking the
                              Ecobank Ghana website or using their branch locator tool in the Ecobank Mobile App.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="code" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Technical Implementation</h3>
                    <p className="text-muted-foreground mb-6">
                      Bankora-AI is built using FastAPI, SerpAPI for search, and Gemini AI for processing. Here's a
                      simplified view of how it works:
                    </p>

                    <div className="rounded-lg border overflow-hidden mb-6">
                      <div className="bg-muted p-4 border-b flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-500" />
                          <div className="h-3 w-3 rounded-full bg-yellow-500" />
                          <div className="h-3 w-3 rounded-full bg-green-500" />
                        </div>
                        <div className="text-xs font-medium">bankora-ai.py</div>
                      </div>

                      <div className="p-4 bg-background overflow-x-auto">
                        <pre className="text-xs text-muted-foreground">
                          <code>{`from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import requests
import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

# Set up API keys (Use environment variables for security)
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
SERPAPI_KEY = os.environ.get("SERPAPI_KEY")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI()


class ChatRequest(BaseModel):
    """Defines the structure of the POST request."""
    query: str


def get_bank_info(bank_name):
    """Fetches bank info using SerpAPI or returns an error message."""
    search_url = f"https://serpapi.com/search?q={bank_name}+Ghana+banking+services&api_key={SERPAPI_KEY}"
    try:
        response = requests.get(search_url, timeout=10)
        response.raise_for_status()
        data = response.json()
        return data.get("organic_results", [{}])[0].get("snippet", "No relevant banking data found.")
    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail="❌ Timeout: Bank information took too long to load.")
    except requests.exceptions.HTTPError as e:
        raise HTTPException(status_code=response.status_code, detail=f"❌ HTTP Error: {str(e)}")
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"❌ Network Error: {str(e)}")

@app.get("/")
def home():
    return {"message": "✅ Banking Chatbot API is Running with Gemini AI!"}

@app.post("/query/")
async def banking_chatbot(request: ChatRequest):
    """Processes user query, validates it, and fetches banking data if needed."""
    query = request.query.strip()

    if not query:
        raise HTTPException(status_code=400, detail="❌ Invalid request: Query cannot be empty.")

    banks = {
        "GCB Bank": ["gcb", "gcbank", "gcb bank"],
        "Absa Bank Ghana": ["absa", "absa gh", "absa bank"],
        "Stanbic Bank": ["stanbic", "stanbic gh", "stanbic bank"],
        "Zenith Bank": ["zenith", "zenith gh", "zenith bank"],
        "Ecobank Ghana": ["ecobank", "eco bank", "ecobank gh"],
        "Fidelity Bank": ["fidelity", "fidelity gh", "fidelity bank"],
        "CalBank": ["calbank", "cal bank"],
        "Standard Chartered": ["standard chartered", "stanchart", "standard bank"],
        "UBA Ghana": ["uba", "uba gh", "uba bank"],
        "Access Bank": ["access", "access bank", "access gh"],
        "Republic Bank": ["republic", "republic bank", "republic gh"],
        "First National Bank": ["fnb", "first national", "first national bank"],
    }

    def find_bank(query):
        """Find the correct bank name from a query string."""
        query_lower = query.lower()
        for bank, aliases in banks.items():
            if any(alias in query_lower for alias in aliases):
                return bank
        return None  # No match found

    matched_bank = find_bank(query)
    if matched_bank:
        bank_info = get_bank_info(matched_bank)
        query += f"\\n\\nRetrieved bank info: {bank_info}"

    try:
        # Use Gemini AI to generate a response
        model = genai.GenerativeModel("gemini-1.5-flash-8b")
        response = model.generate_content(query)
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"❌ AI Processing Error: {str(e)}")
`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Key Components</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4 flex flex-col">
                            <div className="flex items-center gap-2 mb-2">
                              <Search className="h-5 w-5 text-[#3b82f6]" />
                              <h4 className="font-medium">SerpAPI Integration</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Searches for real-time information about Ghanaian banks from the web.
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4 flex flex-col">
                            <div className="flex items-center gap-2 mb-2">
                              <Brain className="h-5 w-5 text-[#3b82f6]" />
                              <h4 className="font-medium">Gemini AI Processing</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Uses Gemini 1.5 Flash to process search results and generate coherent responses.
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4 flex flex-col">
                            <div className="flex items-center gap-2 mb-2">
                              <Building className="h-5 w-5 text-[#3b82f6]" />
                              <h4 className="font-medium">Bank Recognition</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Identifies which Ghanaian bank the user is asking about using alias matching.
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4 flex flex-col">
                            <div className="flex items-center gap-2 mb-2">
                              <Globe className="h-5 w-5 text-[#3b82f6]" />
                              <h4 className="font-medium">FastAPI Backend</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Provides a fast and reliable API endpoint for querying bank information.
                            </p>
                          </CardContent>
                        </Card>
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

