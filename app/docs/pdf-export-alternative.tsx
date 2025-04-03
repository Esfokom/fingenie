"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface PdfExportProps {
  contentId: string
  orientation: "portrait" | "landscape"
}

export function PdfExportAlternative({ contentId, orientation }: PdfExportProps) {
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

      // Manually extract content from each tab
      // This is a more direct approach that doesn't rely on DOM structure

      // Overview section
      const overviewCards = document.querySelectorAll('[data-value="overview"] .card')
      let overviewContent = ""
      overviewCards.forEach((card) => {
        overviewContent += card.outerHTML
      })

      // Features section
      const featuresCards = document.querySelectorAll('[data-value="features"] .card')
      let featuresContent = ""
      featuresCards.forEach((card) => {
        featuresContent += card.outerHTML
      })

      // Mission section
      const missionCards = document.querySelectorAll('[data-value="mission"] .card')
      let missionContent = ""
      missionCards.forEach((card) => {
        missionContent += card.outerHTML
      })

      // Team section
      const teamCards = document.querySelectorAll('[data-value="team"] .card')
      let teamContent = ""
      teamCards.forEach((card) => {
        teamContent += card.outerHTML
      })

      // Models section
      const modelsCards = document.querySelectorAll('[data-value="models"] .card')
      let modelsContent = ""
      modelsCards.forEach((card) => {
        modelsContent += card.outerHTML
      })

      // Combine all content
      const allContent = `
        <div class="print-section">
          <h2 class="text-2xl font-bold mb-6">Overview</h2>
          ${overviewContent}
        </div>
        
        <div class="print-section">
          <h2 class="text-2xl font-bold mb-6 page-break-before">Features</h2>
          ${featuresContent}
        </div>
        
        <div class="print-section">
          <h2 class="text-2xl font-bold mb-6 page-break-before">Our Mission</h2>
          ${missionContent}
        </div>
        
        <div class="print-section">
          <h2 class="text-2xl font-bold mb-6 page-break-before">Our Team</h2>
          ${teamContent}
        </div>
        
        <div class="print-section">
          <h2 class="text-2xl font-bold mb-6 page-break-before">Our AI Models</h2>
          ${modelsContent}
        </div>
      `

      // Write to the new window
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>FinGenie Documentation</title>
            <style>${styles}</style>
            <style>
              @page {
                size: A4 ${orientation};
                margin: 2cm;
              }
              body {
                font-family: Arial, sans-serif;
                padding: 0;
                margin: 0;
                color: #333;
              }
              .container {
                max-width: 100%;
                padding: 0 20px;
              }
              .print-section {
                margin-bottom: 30px;
              }
              .print-section:first-child h2 {
                page-break-before: avoid;
              }
              .page-break-before {
                page-break-before: always;
              }
              .page-break-after {
                page-break-after: always;
              }
              h1, h2, h3, h4, h5, h6 {
                page-break-after: avoid;
              }
              table, figure, .card {
                page-break-inside: avoid;
              }
              .card {
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                margin-bottom: 20px;
                break-inside: avoid;
              }
              .card-header {
                padding: 16px;
                border-bottom: 1px solid #e2e8f0;
              }
              .card-content {
                padding: 16px;
              }
              ul, ol {
                page-break-before: avoid;
              }
              li {
                page-break-inside: avoid;
              }
              /* Fix for grid layouts */
              .grid {
                display: block !important;
              }
              .grid > * {
                margin-bottom: 20px;
              }
              /* Ensure tables are readable */
              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
              }
              th, td {
                border: 1px solid #e2e8f0;
                padding: 8px;
                text-align: left;
              }
              /* Ensure proper spacing */
              p, ul, ol {
                margin-bottom: 16px;
              }
              /* Remove buttons and interactive elements */
              button, [role="tablist"], .no-print {
                display: none !important;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1 class="text-3xl font-bold mb-6 text-center">FinGenie Documentation</h1>
              ${allContent}
              <div class="mt-8 text-center text-sm text-muted-foreground">
                <p>© ${new Date().getFullYear()} FinGenie. All rights reserved.</p>
              </div>
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

