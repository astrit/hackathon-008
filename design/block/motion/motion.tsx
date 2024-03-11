import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import * as gest from "gest"
import { useHotkeys } from "react-hotkeys-hook"
import { toast, Toaster } from "sonner"

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

  useHotkeys("ctrl+c", (): void => {
    toast.success("Motion Gestures commands are available now!")
    setMotion(!motion)
  })

  useEffect(() => {
    if (gest) {
      if (motion) {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          videoRef.current = document.querySelector(
            ".gest-video"
          ) as HTMLVideoElement | null
          if (videoRef.current) {
            videoRef.current.srcObject = stream
            gest.start()
            gest.options.subscribeWithCallback(function (gesture: {
              direction: any
            }) {
              if (gesture.direction === "Right") {
                console.log("Gesture detected!", gesture)
                toast.success("Motion Gesture: " + gesture.direction)
                checkAccessibility()
              } else if (gesture.direction === "Left") {
                toast.success("Motion Gesture: " + gesture.direction)
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

  return <video className="motion-video" ref={videoRef} />
}
