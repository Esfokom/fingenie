"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface PdfExportProps {
  contentId: string
  orientation: "portrait" | "landscape"
}

export function PdfExport({ contentId, orientation }: PdfExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const handleExport = async () => {
    setIsExporting(true)

    try {
      // Create a new window for printing
      const printWindow = window.open("", "_blank")

      if (!printWindow) {
        throw new Error("Could not open print window. Please check your popup settings.")
      }

      // Get the styles from the current document
      const styles = Array.from(document.styleSheets)
        .map((styleSheet) => {
          try {
            return Array.from(styleSheet.cssRules)
              .map((rule) => rule.cssText)
              .join("\n")
          } catch (e) {
            // Ignore cross-origin stylesheets
            return ""
          }
        })
        .filter(Boolean)
        .join("\n")

      // Create simplified content for each section

      // Cover page
      const coverPage = `
        <div class="cover-page">
          <div class="logo">
            <div class="logo-circle"></div>
          </div>
          <h1>FinGenie Documentation</h1>
          <p class="subtitle">AI-Powered Banking Assistant</p>
          <p class="date">Last Updated: ${new Date().toLocaleDateString()}</p>
        </div>
      `

      // Overview section
      const overviewSection = `
        <div class="section">
          <h2>1. Project Overview</h2>
          
          <div class="content-block">
            <h3>What is FinGenie?</h3>
            <p>FinGenie is an AI-powered conversational banking assistant designed to simplify banking experiences through natural language interactions. It combines advanced AI models with financial expertise to provide instant answers to banking questions, track expenses, and offer personalized financial insights.</p>
            
            <h3>Key Capabilities</h3>
            <ul>
              <li>Natural language conversations about banking and finance</li>
              <li>Real-time information about Ghanaian banks</li>
              <li>Expense tracking and financial management</li>
              <li>Personalized financial insights and recommendations</li>
              <li>Secure user authentication and data protection</li>
            </ul>
          </div>
          
          <div class="content-block">
            <h3>Roadmap</h3>
            <table>
              <tr>
                <th>Timeline</th>
                <th>Feature</th>
                <th>Description</th>
              </tr>
              <tr>
                <td>Q1 2025</td>
                <td>Bank API Integration</td>
                <td>Direct integration with Ecobank and other major Ghanaian banks</td>
              </tr>
              <tr>
                <td>Q2 2025</td>
                <td>Transaction Management</td>
                <td>View and manage transactions with detailed analytics</td>
              </tr>
              <tr>
                <td>Q3 2025</td>
                <td>Payment Capabilities</td>
                <td>Send money, pay bills, and make transfers</td>
              </tr>
              <tr>
                <td>Q4 2025</td>
                <td>Enhanced Security</td>
                <td>Advanced biometric authentication and encryption</td>
              </tr>
            </table>
          </div>
        </div>
      `

      // Features section
      const featuresSection = `
        <div class="section">
          <h2>2. Core Features</h2>
          
          <div class="content-block">
            <h3>Conversational AI</h3>
            <p>Natural language interface for intuitive banking interactions. Ask questions about banking terms, services, and financial concepts.</p>
            
            <h3>Bank Information</h3>
            <p>Access up-to-date information about banks in Ghana through Bankora-AI, including services, locations, and contact details.</p>
            
            <h3>Expense Tracking</h3>
            <p>Track and categorize expenses, visualize spending patterns, and gain insights into your financial habits.</p>
            
            <h3>Financial Insights</h3>
            <p>Receive personalized financial recommendations and insights based on your spending patterns and goals.</p>
          </div>
          
          <div class="content-block">
            <h3>Dashboard Features</h3>
            <ul>
              <li><strong>Financial Overview:</strong> Get a comprehensive view of your financial status, including current balance, recent income, and expenses.</li>
              <li><strong>Expense Analytics:</strong> Visualize your spending by category and track monthly trends to identify areas for improvement.</li>
              <li><strong>Transaction Management:</strong> Add, view, and manage all your financial transactions in one place with detailed filtering and search capabilities.</li>
            </ul>
          </div>
          
          <div class="content-block">
            <h3>User Experience</h3>
            <ul>
              <li><strong>Intuitive Interface:</strong> Clean, modern design with easy navigation and responsive layout for all devices.</li>
              <li><strong>Personalization:</strong> Customizable profiles and preferences to tailor the experience to individual needs.</li>
              <li><strong>Accessibility:</strong> Designed with accessibility in mind, ensuring all users can benefit from FinGenie's features.</li>
            </ul>
          </div>
        </div>
      `

      // Mission section
      const missionSection = `
        <div class="section">
          <h2>3. Our Mission</h2>
          
          <div class="content-block">
            <p>At FinGenie, we're on a mission to transform how people interact with their banking services. Traditional banking apps often require users to navigate complex interfaces to access financial information. Many users struggle with tracking expenses, managing savings, and making informed financial decisions.</p>
            <p>We believe that banking should be as simple as having a conversation. Our AI-powered assistant provides instant answers to financial questions, helps track expenses, and offers personalized financial advice - all through a natural, conversational interface.</p>
          </div>
          
          <div class="content-block">
            <h3>Problem & Solution</h3>
            <table>
              <tr>
                <th>The Problem</th>
                <th>Our Solution</th>
              </tr>
              <tr>
                <td>Complex banking interfaces that are difficult to navigate</td>
                <td>Conversational AI interface that understands natural language</td>
              </tr>
              <tr>
                <td>Difficulty tracking expenses and managing savings effectively</td>
                <td>Specialized financial knowledge through our finetuned FinGenie model</td>
              </tr>
              <tr>
                <td>Limited access to personalized financial advice</td>
                <td>Real-time banking information through Bankora-AI</td>
              </tr>
              <tr>
                <td>Existing chatbots lack deep financial understanding</td>
                <td>Personalized financial insights and recommendations</td>
              </tr>
              <tr>
                <td>Disconnected banking services that don't provide a unified experience</td>
                <td>Secure and private handling of financial information</td>
              </tr>
            </table>
          </div>
          
          <div class="content-block">
            <h3>Our Vision</h3>
            <p>Our vision is to create a world where banking is accessible, intuitive, and personalized for everyone. We envision FinGenie becoming an essential financial companion that not only answers questions but proactively helps users achieve their financial goals.</p>
            <ul>
              <li>Direct integration with major banks for real-time account management</li>
              <li>AI-powered financial planning and wealth management</li>
              <li>Voice-activated banking through multiple devices</li>
              <li>Predictive financial insights based on spending patterns</li>
              <li>Creating a financial ecosystem that works for everyone</li>
            </ul>
          </div>
        </div>
      `

      // Team section
      const teamSection = `
        <div class="section">
          <h2>4. Our Team</h2>
          
          <div class="content-block">
            <h3>Our Story</h3>
            <p>FinGenie started as a project at Kwame Nkrumah University of Science and Technology (KNUST) by a group of passionate computer science students who recognized the challenges people face with traditional banking interfaces.</p>
            <p>The team observed that while banking services were becoming increasingly digital, the user experience remained complex and often frustrating. They envisioned a solution that would leverage the power of AI to create a more intuitive and conversational banking experience.</p>
          </div>
          
          <div class="content-block">
            <h3>Key Team Members</h3>
            <table>
              <tr>
                <th>Name</th>
                <th>Role</th>
              </tr>
              <tr>
                <td>Ampah Emily Maureen</td>
                <td>Project Manager & Backend Developer</td>
              </tr>
              <tr>
                <td>Dumashie Bruce Klenam</td>
                <td>Frontend Developer</td>
              </tr>
              <tr>
                <td>Nsiah Milcah Beatrice Owusuaa</td>
                <td>Frontend Developer</td>
              </tr>
              <tr>
                <td>Asaah Manasseh</td>
                <td>Backend Developer</td>
              </tr>
              <tr>
                <td>Elvis Fosu Owusu</td>
                <td>Machine Learning Engineer</td>
              </tr>
              <tr>
                <td>Kusi James</td>
                <td>Quality Assurance Engineer</td>
              </tr>
            </table>
          </div>
          
          <div class="content-block">
            <h3>Our University</h3>
            <p>We are proud students of Kwame Nkrumah University of Science and Technology (KNUST), one of Ghana's premier institutions for technology education and innovation.</p>
            <p>As level 300 Computer Science students, we're applying our knowledge and skills to create solutions that address real-world challenges in the banking sector.</p>
          </div>
        </div>
      `

      // Models section
      const modelsSection = `
        <div class="section">
          <h2>5. Our AI Models</h2>
          
          <div class="content-block">
            <h3>FinGenie Model</h3>
            <p>FinGenie is a finetuned Gemini model specifically designed for banking and finance. It was trained on Gemini 1.5 Flash 001 Tuning with a comprehensive dataset of 4,529 example questions and answers revolving around banking.</p>
            <ul>
              <li><strong>Training Time:</strong> 2h 2m</li>
              <li><strong>Dataset Size:</strong> 4,529 Q&A Pairs</li>
            </ul>
            <p><strong>Key Capabilities:</strong></p>
            <ul>
              <li>Answers detailed questions about banking products and services</li>
              <li>Explains financial concepts and terminology</li>
              <li>Provides guidance on banking procedures and requirements</li>
              <li>Offers information on security practices and fraud prevention</li>
            </ul>
          </div>
          
          <div class="content-block">
            <h3>Bankora-AI Model</h3>
            <p>Bankora-AI is a specialized system that provides up-to-date information about banks in Ghana. Unlike FinGenie, which is a finetuned model, Bankora-AI works by combining search capabilities with AI processing to deliver accurate and current information.</p>
            <p><strong>How Bankora-AI Works:</strong></p>
            <ol>
              <li><strong>Query Analysis:</strong> When you ask a question about a Ghanaian bank, Bankora-AI identifies which bank you're referring to.</li>
              <li><strong>Information Retrieval:</strong> It uses SerpAPI to search for the most current information about that bank.</li>
              <li><strong>AI Processing:</strong> The retrieved information is processed by Gemini 1.5 Flash to generate a comprehensive response.</li>
              <li><strong>Response Delivery:</strong> You receive accurate, up-to-date information about the bank's services, locations, or other details.</li>
            </ol>
          </div>
          
          <div class="content-block">
            <h3>Model Comparison</h3>
            <table>
              <tr>
                <th>Feature</th>
                <th>FinGenie</th>
                <th>Bankora-AI</th>
              </tr>
              <tr>
                <td>AI Model Type</td>
                <td>Finetuned Gemini 1.5 Flash</td>
                <td>Gemini 1.5 Flash with search integration</td>
              </tr>
              <tr>
                <td>Primary Focus</td>
                <td>General banking and finance knowledge</td>
                <td>Specific information about Ghanaian banks</td>
              </tr>
              <tr>
                <td>Information Currency</td>
                <td>Based on training data</td>
                <td>Up-to-date through web search</td>
              </tr>
              <tr>
                <td>Best For</td>
                <td>General banking questions and concepts</td>
                <td>Questions about specific Ghanaian banks</td>
              </tr>
            </table>
          </div>
        </div>
      `

      // Write to the new window
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>FinGenie Documentation</title>
            <style>
              @page {
                size: ${orientation === "landscape" ? "A4 landscape" : "A4"};
                margin: 2cm;
              }
              body {
                font-family: Arial, sans-serif;
                line-height: 1.5;
                color: #333;
                margin: 0;
                padding: 0;
              }
              .cover-page {
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                page-break-after: always;
              }
              .logo {
                margin-bottom: 2rem;
              }
              .logo-circle {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: linear-gradient(to right, #ff5722, #ff9800);
                position: relative;
              }
              .logo-circle:before {
                content: "";
                position: absolute;
                inset: 5px;
                border-radius: 50%;
                background: white;
              }
              .logo-circle:after {
                content: "";
                position: absolute;
                inset: 15px;
                border-radius: 50%;
                background: linear-gradient(to right, #ff5722, #ff9800);
              }
              h1 {
                font-size: 36px;
                margin-bottom: 1rem;
                color: #333;
              }
              .subtitle {
                font-size: 20px;
                color: #666;
                margin-bottom: 2rem;
              }
              .date {
                font-size: 14px;
                color: #888;
              }
              .section {
                page-break-before: always;
                padding: 0 0 2rem 0;
              }
              .section:first-of-type {
                page-break-before: avoid;
              }
              h2 {
                font-size: 24px;
                margin-bottom: 1.5rem;
                color: #ff5722;
                border-bottom: 1px solid #eee;
                padding-bottom: 0.5rem;
              }
              h3 {
                font-size: 18px;
                margin: 1.5rem 0 0.75rem 0;
                color: #333;
              }
              p, ul, ol {
                margin-bottom: 1rem;
              }
              ul, ol {
                padding-left: 2rem;
              }
              li {
                margin-bottom: 0.5rem;
              }
              .content-block {
                margin-bottom: 2rem;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 1rem 0 2rem 0;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 8px 12px;
                text-align: left;
              }
              th {
                background-color: #f5f5f5;
                font-weight: bold;
              }
              tr:nth-child(even) {
                background-color: #f9f9f9;
              }
              strong {
                font-weight: bold;
              }
              .footer {
                text-align: center;
                font-size: 12px;
                color: #888;
                margin-top: 2rem;
                border-top: 1px solid #eee;
                padding-top: 1rem;
              }
            </style>
          </head>
          <body>
            ${coverPage}
            ${overviewSection}
            ${featuresSection}
            ${missionSection}
            ${teamSection}
            ${modelsSection}
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} FinGenie. All rights reserved.</p>
              <p>Developed by students of Kwame Nkrumah University of Science and Technology, KNUST.</p>
            </div>
            
            <script>
              window.onload = function() {
                setTimeout(function() {
                  window.print();
                  setTimeout(function() {
                    window.close();
                  }, 500);
                }, 1000);
              };
            </script>
          </body>
        </html>
      `)

      printWindow.document.close()

      toast({
        title: "Export initiated",
        description: "Your browser's print dialog should open shortly",
      })
    } catch (error) {
      console.error("Export failed:", error)
      toast({
        title: "Export failed",
        description: error.message || "An error occurred during export",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button onClick={handleExport} disabled={isExporting} className="gap-2">
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Preparing...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Export as PDF
        </>
      )}
    </Button>
  )
}

