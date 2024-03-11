"use client"

import { useEffect, useRef } from "react"
import {
  addClass,
  addEventListener,
  addProps,
  getCursor,
  removeAllProps,
  removeClass,
} from "$/cursor/cursor"

import "@/cursor/cursor.css"

export default function Cursor() {
  const REF_CURSOR = useRef<HTMLDivElement | null>(null)
  const REF_MAGNET = useRef<HTMLDivElement | null>(null)
  const REF_RING = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const CURSOR = REF_CURSOR.current
    const MAGNET = REF_MAGNET.current
    const RING = REF_RING.current
    const DOC = document.documentElement
    let ANCHORED = false

    const observer = new MutationObserver(() => {
      const anchors = document.querySelectorAll("a, button")

      if (MAGNET) {
        removeAllProps(MAGNET)
      }

      anchors.forEach((anchor) => {
        const BOX = anchor.getBoundingClientRect()

        addEventListener(anchor, "mouseenter", (e) => {
          addClass(CURSOR, "anchored")
          ANCHORED = true
          if (MAGNET) {
            const anchorStyle = window.getComputedStyle(anchor)
            const borderRadius =
              anchorStyle.borderRadius === "0px"
                ? "200px"
                : anchorStyle.borderRadius

            addProps(MAGNET, {
              width: BOX.width + 12 + "px",
              height: BOX.height + 12 + "px",
              "border-radius": borderRadius,
            })
          }
          if (ANCHORED && BOX && MAGNET) {
            addProps(MAGNET, {
              top: BOX.top - 6 + "px",
              left: BOX.left - 6 + "px",
            })
          }
        })

        if (CURSOR) {
          addEventListener(DOC, "pointerdown", () => {
            addClass(CURSOR, "down")
          })
        }

        addEventListener(DOC, "pointerup", () => {
          removeClass(CURSOR, "down")
        })

        addEventListener(anchor, "mouseleave", () => {
          ANCHORED = false
          removeClass(CURSOR, "anchored")
          if (MAGNET) {
            removeAllProps(MAGNET)
          }
        })
      })

      if (CURSOR && DOC && MAGNET) {
        window.addEventListener("mousemove", getCursor(CURSOR))
      }
    })

    observer.observe(document, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="cursor" ref={REF_CURSOR}>
      <div className="magnet" ref={REF_MAGNET} />
      <div className="ring" ref={REF_RING} />
    </div>
  )
}
