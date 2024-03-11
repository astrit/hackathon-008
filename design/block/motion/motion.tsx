import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import * as gest from "gest"
import { useHotkeys } from "react-hotkeys-hook"

declare module "gest" {
  export function start(): void
  export function stop(): void
  export const options: {
    subscribeWithCallback(callback: (gesture: any) => void): void
  }
}

export default function Motion() {
  const router = useRouter()
  const [motion, setMotion] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const gest =
    typeof window !== "undefined" && "gest" in window
      ? (window as any).gest
      : null

  const checkAccessibility = (): void => {
    router.push("/a11y")
  }

  const goHome = (): void => {
    router.push("/")
  }

  useHotkeys("ctrl+c", (): void => setMotion(!motion))

  useEffect(() => {
    if (gest) {
      if (motion) {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
            gest.start()
            gest.options.subscribeWithCallback(function (gesture: {
              direction: any
            }) {
              if (gesture.direction === "Right") {
                console.log("Gesture detected!", gesture)
                checkAccessibility()
              } else {
                goHome()
              }
            })
          }
        })
      } else {
        // gest.stop()
        if (videoRef.current && videoRef.current.srcObject) {
          let stream = videoRef.current.srcObject as MediaStream
          let tracks = stream.getTracks()

          tracks.forEach(function (track) {
            track.stop()
          })

          videoRef.current.srcObject = null
        }
      }
    }
  }, [motion, gest])

  return (
    <div>
      <h1>Motion</h1>
      <p>{motion ? "Scanning..." : "Press Ctrl+C to start motion gestures"}</p>
      <video ref={videoRef} style={{ display: motion ? "block" : "none" }} />
    </div>
  )
}
