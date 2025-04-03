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
      // Get the content element
      const element = document.getElementById(contentId)

      if (!element) {
        throw new Error("Content element not found")
      }

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

      // Clone the content
      const contentClone = element.cloneNode(true) as HTMLElement

      // Write to the new window
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>FinGenie Documentation</title>
            <style>${styles}</style>
            <style>
              @page {
                size: ${orientation};
                margin: 1cm;
              }
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
              }
              @media print {
                .no-print {
                  display: none !important;
                }
              }
            </style>
          </head>
          <body>
            <div class="container mx-auto">
              <h1 class="text-3xl font-bold mb-6 text-center">FinGenie Documentation</h1>
              ${contentClone.outerHTML}
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

