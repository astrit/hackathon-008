import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useHotkeys } from "react-hotkeys-hook"
import { toast, Toaster } from "sonner"

export default function Voice() {
  const router = useRouter()
  const [listening, setListening] = useState(false)

  const checkAccessibility = () => {
    router.push("/a11y")
  }

  useHotkeys("ctrl+v", () => {
    toast.success("Voice commands are available now!")
    setListening(!listening)
  })

  useEffect(() => {
    if (typeof window !== "undefined" && "annyang" in window) {
      const annyang = (window as any).annyang

      const commands = {
        "check accessibility": () => {
          console.log("Going to home")
          toast.success("Voice: Checking accessibility")
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

  return listening ? "Listening..." : null
}
