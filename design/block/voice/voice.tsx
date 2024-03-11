import React, { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useHotkeys } from "react-hotkeys-hook"

export default function Voice() {
  const router = useRouter()
  const [listening, setListening] = useState(false)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  const goToHome = () => {
    router.push("/a11y")
  }

  useHotkeys("ctrl+k", () => setListening(!listening))

  useEffect(() => {
    if ("SpeechRecognition" in window) {
      const recognitionInstance = new window.SpeechRecognition()
      recognitionInstance.onresult = (event) => {
        const result = event.results[0][0].transcript
        if (result.includes("go to home")) {
          goToHome()
          console.log("Going to home")
        } else if (result.includes("go to here")) {
          goToHome()
          console.log("Going to here")
        } else if (result.includes("go to there")) {
          goToHome()
          console.log("Going to there")
        }
        setListening(false)
      }
      setRecognition(recognitionInstance)
    } else {
      console.log("Browser does not support Speech Recognition.")
    }
  }, [])

  useEffect(() => {
    if (recognition) {
      if (listening) {
        recognition.start()
      } else {
        recognition.stop()
      }
    }
  }, [listening, recognition])

  return (
    <div>
      <h1>Voice</h1>
      <p>{listening ? "Listening..." : "Press Ctrl+K to start listening"}</p>
    </div>
  )
}
