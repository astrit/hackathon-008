"use client"

import { useEffect, useState } from "react"
import { IBM_Plex_Mono, JetBrains_Mono, Silkscreen } from "next/font/google"
import Inter from "$/fonts/Inter"

const silk = Silkscreen({
  subsets: ["latin"],
  display: "block",
  weight: "400",
  variable: "--font-silk",
})

const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "block",
  weight: "400",
  variable: "--font-jetbrains-mono",
})

const IBM = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "block",
  weight: "400",
  variable: "--font-ibm-plex",
})

export default function Fonts({ children }: { children: React.ReactNode }) {
  const [stylesheetCreated, setStylesheetCreated] = useState(false)

  useEffect(() => {
    if ("adoptedStyleSheets" in document) {
      const sheet = new CSSStyleSheet()
      sheet.replaceSync(`
        :root { 
            --font-inter: ${Inter.style.fontFamily}; 
            --font-silk: ${silk.style.fontFamily};
            --font-jetbrains-mono: ${jetBrains.style.fontFamily};
            --font-ibm-plex: ${IBM.style.fontFamily};
        }`)
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet]
      setStylesheetCreated(true)
    }
  }, [])

  if (!stylesheetCreated) {
    return null
  }

  return children
}
