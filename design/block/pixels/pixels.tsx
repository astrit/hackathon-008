"use client"

import { useEffect, useState } from "react"

interface WindowSize {
  width: number
  height: number
}

const Pixels: React.FC = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const { width, height } = windowSize

  return (
    <span>
      {width.toLocaleString()} × {height.toLocaleString()}
    </span>
  )
}

export default Pixels
