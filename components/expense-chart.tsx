"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface ExpenseChartProps {
  data: Record<string, number>
  type?: "pie" | "bar" | "line"
}

export function ExpenseChart({ data, type = "pie" }: ExpenseChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Prepare data
    const labels = Object.keys(data)
    const values = Object.values(data)

    // Generate colors
    const colors = generateColors(labels.length, type)

    // Format labels for bar chart (if they are dates)
    const formattedLabels =
      type === "bar" && labels[0]?.includes("-")
        ? labels.map((label) => {
            const date = new Date(label)
            return date.toLocaleDateString(undefined, { month: "short", year: "numeric" })
          })
        : labels

    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: type,
      data: {
        labels: formattedLabels,
        datasets: [
          {
            label: type === "pie" ? "" : "Amount (GH₵)",
            data: values,
            backgroundColor: colors.background,
            borderColor: colors.border,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: theme === "dark" ? "#e5e7eb" : "#374151",
              padding: 20,
              font: {
                size: 12,
              },
            },
            display: type === "pie",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.raw as number
                return `${label}: GH₵ ${value.toFixed(2)}`
              },
            },
          },
        },
        scales:
          type !== "pie"
            ? {
                x: {
                  ticks: {
                    color: theme === "dark" ? "#e5e7eb" : "#374151",
                  },
                  grid: {
                    color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                  },
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: theme === "dark" ? "#e5e7eb" : "#374151",
                    callback: (value) => "GH₵ " + value,
                  },
                  grid: {
                    color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                  },
                },
              }
            : undefined,
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, type, theme])

  // Generate colors based on chart type
  const generateColors = (count: number, chartType: string) => {
    const backgroundColors = []
    const borderColors = []

    if (chartType === "pie") {
      // Colorful palette for pie chart
      const baseColors = [
        "rgba(255, 99, 132, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 206, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(153, 102, 255, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(199, 199, 199, 0.7)",
        "rgba(83, 102, 255, 0.7)",
        "rgba(40, 159, 64, 0.7)",
        "rgba(210, 199, 199, 0.7)",
      ]

      for (let i = 0; i < count; i++) {
        const colorIndex = i % baseColors.length
        backgroundColors.push(baseColors[colorIndex])
        borderColors.push(baseColors[colorIndex].replace("0.7", "1"))
      }
    } else {
      // Single color with opacity for bar/line charts
      const primaryColor = theme === "dark" ? "rgba(255, 87, 34, 0.7)" : "rgba(255, 87, 34, 0.7)"
      const primaryBorder = theme === "dark" ? "rgba(255, 87, 34, 1)" : "rgba(255, 87, 34, 1)"

      for (let i = 0; i < count; i++) {
        backgroundColors.push(primaryColor)
        borderColors.push(primaryBorder)
      }
    }

    return {
      background: backgroundColors,
      border: borderColors,
    }
  }

  return <canvas ref={chartRef} />
}

