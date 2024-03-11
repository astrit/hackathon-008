"use client"

import React, { useEffect, useRef } from "react"

import "@/cursor/cursor.css"

const Cursor: React.FC = () => {
  const magnetRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1024px)").matches
    const magnet = magnetRef.current
    const ring = ringRef.current

    if (!isMobile && magnet && ring) {
      let isStuck = false
      let targetBox: DOMRect | null = null
      let magnetOuterOriginalState = {
        width: magnet.getBoundingClientRect().width,
        height: magnet.getBoundingClientRect().height,
      }

      const handleMouseEnter = (e: Event) => {
        const target = e.target as HTMLElement
        isStuck = true
        targetBox = target.getBoundingClientRect()
        target.classList.add("anchored")
        magnet.classList.add("anchored")
        ring.classList.add("anchored")
        magnet.style.setProperty("width", `${targetBox.width}px`)
        magnet.style.setProperty("height", `${targetBox.height}px`)
        magnet.style.setProperty(
          "border-radius",
          window.getComputedStyle(target).borderRadius
        )
        magnet.style.setProperty(
          "border-color",
          window.getComputedStyle(target).borderColor
        )
        console.log("targetBox")
      }

      const handleMouseLeave = (e: Event) => {
        const target = e.target as HTMLElement
        isStuck = false
        target.classList.remove("anchored")
        magnet.classList.remove("anchored")
        ring.classList.remove("anchored")
        magnet.style.removeProperty("width")
        magnet.style.removeProperty("height")
        magnet.style.removeProperty("border-radius")
        magnet.style.removeProperty("border-color")

        console.log("targetBox")
      }

      const updateCursorPositions = (e: MouseEvent) => {
        const cursorX = e.clientX + "px"
        const cursorY = e.clientY + "px"

        document.documentElement.style.setProperty("--cursor-x", cursorX)
        document.documentElement.style.setProperty("--cursor-y", cursorY)
      }

      const updateCursors = () => {
        const cursorX = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--cursor-x")
        const cursorY = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--cursor-y")

        if (cursorX && cursorY) {
          ring.style.setProperty("--cursor-x", cursorX)
          ring.style.setProperty("--cursor-y", cursorY)

          if (isStuck && targetBox) {
            magnet.style.setProperty("--cursor-x", `${targetBox.left}px`)
            magnet.style.setProperty("--cursor-y", `${targetBox.top}px`)
          } else {
            magnet.style.setProperty("--cursor-x", cursorX)
            magnet.style.setProperty("--cursor-y", cursorY)
          }

          magnet.classList.add("on")
          ring.classList.add("on")
        } else {
          magnet.classList.remove("on")
          ring.classList.remove("on")
        }

        requestAnimationFrame(updateCursors)
      }

      const handlePointerDown = () => {
        magnet.classList.add("down")
        ring.classList.add("down")
      }

      const handlePointerUp = () => {
        magnet.classList.remove("down")
        ring.classList.remove("down")
      }

      const handlePointerContextMenu = (e: MouseEvent) => {
        // e.preventDefault()
        magnet.classList.add("context")
        ring.classList.add("context")

        setTimeout(() => {
          magnet.classList.remove("context")
          ring.classList.remove("context")
        }, 242)
      }

      const darkElements = document.querySelectorAll(".dark-cursor")

      darkElements.forEach((darkElement) => {
        darkElement.addEventListener("pointerenter", () =>
          magnet.classList.add("dark")
        )
        darkElement.addEventListener("pointerleave", () =>
          magnet.classList.remove("dark")
        )
      })

      const anchors = document.querySelectorAll("a, button")

      anchors.forEach((anchor) => {
        anchor.addEventListener("pointerenter", handleMouseEnter)
        anchor.addEventListener("pointerleave", handleMouseLeave)
      })

      document.body.addEventListener("pointerdown", handlePointerDown)
      document.body.addEventListener("pointerup", handlePointerUp)
      document.body.addEventListener("contextmenu", handlePointerContextMenu)

      updateCursors()

      window.addEventListener("mousemove", updateCursorPositions)

      return () => {
        window.removeEventListener("mousemove", updateCursorPositions)
        document.body.removeEventListener("pointerdown", handlePointerDown)
        document.body.removeEventListener("pointerup", handlePointerUp)
        document.body.removeEventListener(
          "contextmenu",
          handlePointerContextMenu
        )

        darkElements.forEach((darkElement) => {
          darkElement.removeEventListener("pointerenter", () =>
            magnet.classList.add("dark")
          )
          darkElement.removeEventListener("pointerleave", () =>
            magnet.classList.remove("dark")
          )
        })
        anchors.forEach((anchor) => {
          anchor.removeEventListener("pointerenter", handleMouseEnter)
          anchor.removeEventListener("pointerleave", handleMouseLeave)
        })
      }
    }
  }, [])

  return (
    <div className="cursor">
      <div className="magnet" ref={magnetRef}></div>
      <div className="ring" ref={ringRef}></div>
    </div>
  )
}

export default Cursor
