"use client"

import { useContext, useEffect, useRef, useState } from "react"
import Icon from "@/icon/icon"
import Link from "@/link/link"
import { shuffle } from "$/shuffle/shuffle"
import { Controller } from "$/theme/provider"

import "@/hero/hero.css"

import Motion from "@/motion/motion"
import Voice from "@/voice/voice"

interface HeroItem {
  name: string
  markup: JSX.Element
}

interface ShuffleOptions {
  iterations: number
  fps: number
  onComplete: (elm: HTMLElement) => void
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [context, setContext] = useState(0)
  const { toggleCmd } = useContext(Controller)

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    setContext((prevContext) => prevContext + 1)
  }

  useEffect(() => {
    if (heroRef.current) {
      const shuffleMe = Array.from(
        heroRef.current.querySelectorAll(".hero span")
      ) as HTMLElement[]
      const options: ShuffleOptions = {
        iterations: 12,
        fps: 24,
        onComplete: (elm) => {
          if (elm === shuffleMe[shuffleMe.length - 1]) {
          }
        },
      }
      shuffle(shuffleMe, options)
    }
  }, [context])

  const [isWindows, setIsWindows] = useState(false)

  useEffect(() => {
    const userAgent = window.navigator.userAgent
    setIsWindows(userAgent.indexOf("Windows") !== -1)
  }, [])

  // prettier-ignore
  const heroItems: { [key: string]: HeroItem[] } = {
  "intro": [
    { name: "hero-sin", markup: <><Icon name="copy" /><span>{`Ask AI - Green GPT`}</span></> },
    { name: "hero-ski", markup: <><Icon name="check" /><span>{`Accessability Checker`}</span></> },
    { name: "hero-sin", markup: <><Icon name="voice" /><span>{`Navigate with your voice`}</span></> },
    { name: "hero-sin", markup: <><Icon name="motion" /><span>{`Motion Gestures Navigation`}</span></> },
  ],
}

  return (
    <div className="hero" onContextMenu={handleContextMenu} ref={heroRef}>
      <div className="hero-content">
        {Object.keys(heroItems).map((group) => (
          <div className={`sec ` + group} key={group}>
            {heroItems[group].map((item, index) => (
              <div key={index} className={`sub ` + item.name}>
                {item.markup}
              </div>
            ))}
          </div>
        ))}

        <Voice />
        <Motion />
      </div>
    </div>
  )
}
