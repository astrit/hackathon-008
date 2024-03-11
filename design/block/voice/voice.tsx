import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useHotkeys } from "react-hotkeys-hook"

export default function Voice() {
  const router = useRouter()
  const [listening, setListening] = useState(false)

  const checkAccessibility = () => {
    router.push("/a11y")
  }

  useHotkeys("ctrl+k", () => setListening(!listening))

  useEffect(() => {
    if (typeof window !== "undefined" && "annyang" in window) {
      const annyang = (window as any).annyang

      const commands = {
        "check accessibility": () => {
          console.log("Going to home")
          checkAccessibility()
        },
        "go to here": () => {
          console.log("Going to here")
        },
        "go to there": () => {
          console.log("Going to there")
        },
      }

      annyang.addCommands(commands)

      if (listening) {
        annyang.start()
      } else {
        annyang.pause()
      }
    }
  }, [listening])

  return (
    <div>
      <h1>Voice</h1>
      <p>{listening ? "Listening..." : "Press Ctrl+K to start listening"}</p>
    </div>
  )
}
