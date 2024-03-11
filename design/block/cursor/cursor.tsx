"use client"

import { useContext, useEffect, useRef, useState } from "react"
import {
  addClass,
  addEventListener,
  addProps,
  getCursor,
  // playAudio,
  removeAllProps,
  removeClass,
} from "$/cursor/cursor"
import { Controller } from "$/theme/provider"

import "@/cursor/cursor.css"

export default function Cursor() {
  const REF_CURSOR = useRef<HTMLDivElement | null>(null)
  const REF_MAGNET = useRef<HTMLDivElement | null>(null)
  const REF_RING = useRef<HTMLDivElement | null>(null)
  const { isAudio, audioRef, toggleAudio } = useContext(Controller)

  useEffect(() => {
    const CURSOR = REF_CURSOR.current
    const MAGNET = REF_MAGNET.current
    const RING = REF_RING.current
    const DOC = document.documentElement
    let ANCHORED = false

    window.addEventListener("mouseout", () => {
      if (CURSOR) {
        removeClass(CURSOR, "on")
      } else {
        addClass(CURSOR, "on")
      }
    })

    const handleLinkHover = (event: MouseEvent) => {
      if (MAGNET) {
        removeAllProps(MAGNET)
      }

      const anchor = (event.target as HTMLElement).closest(
        "header a,footer a, header button, footer button, .list a, .hero-fka button, .trail a, .trail button"
      )

      anchor?.classList.add("anchored")

      if (anchor && !anchor.matches(".list a")) {
        ANCHORED = true
        const BOX = anchor.getBoundingClientRect()
        addClass(CURSOR, "anchored")
        // Audio
        if (audioRef) {
          anchor.addEventListener("mouseenter", () => audioRef.current?.play())
        }

        if (MAGNET) {
          const anchorStyle = window.getComputedStyle(anchor)
          let borderRadius = parseInt(anchorStyle.borderRadius, 10)

          if (borderRadius === 0) {
            borderRadius = 200
          } else {
            borderRadius += 6
          }

          addProps(MAGNET, {
            width: BOX.width + 12 + "px",
            height: BOX.height + 12 + "px",
            "border-radius": borderRadius + "px",
          })
        }

        if (ANCHORED && BOX && MAGNET) {
          addProps(MAGNET, {
            top: BOX.top - 6 + "px",
            left: BOX.left - 6 + "px",
          })
        }

        anchor.addEventListener("mouseout", () => {
          anchor.classList.remove("anchored")
          if (CURSOR) {
            removeClass(CURSOR, "anchored")
          }
          ANCHORED = false
        })
      }
    }

    if (CURSOR) {
      addEventListener(DOC, "pointerdown", () => {
        addClass(CURSOR, "down")
      })
    }

    if (CURSOR && DOC && MAGNET) {
      window.addEventListener("mousemove", () => {
        if (CURSOR) {
          addClass(CURSOR, "on")
        }
      })
      window.addEventListener("mousemove", getCursor(CURSOR))
    }

    addEventListener(DOC, "pointerup", () => {
      removeClass(CURSOR, "down")
    })

    document.addEventListener("mouseover", handleLinkHover)
    return () => {
      document.removeEventListener("mouseover", handleLinkHover)
    }
  }, [])
  return (
    <div className="cursor" ref={REF_CURSOR}>
      <div className="magnet" ref={REF_MAGNET} />
      <div className="ring" ref={REF_RING} />
      {/* <button onClick={toggleAudio}>
        {isAudio ? "Disable audio" : "Enable audio"}
      </button> */}
    </div>
  )
}
