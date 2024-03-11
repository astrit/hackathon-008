"use client"

import { useContext, useEffect, useRef } from "react"
import { Controller } from "$/theme/provider"

import "@/cursor/cursor.css"

export default function Cursor() {
  const { pole } = useContext(Controller)
  const cursorRef = useRef(null)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const anchors = document.querySelectorAll("a, button")
      console.log(anchors)
    })

    observer.observe(document, { childList: true, subtree: true })

    // Clean up the observer when the component unmounts
    return () => observer.disconnect()
  }, [])

  return (
    <div className="cursor">
      <div className="magnet"></div>
      <div className="ring"></div>
    </div>
  )
}
