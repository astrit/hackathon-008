"use client"

import { useEffect, useState } from "react"

export default function Time() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
      setTime(formattedTime)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return <time dateTime={time}>{time || "00:00:00"}</time>
}
