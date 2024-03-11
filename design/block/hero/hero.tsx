"use client"

import { useContext, useEffect, useRef, useState } from "react"
import Icon from "@/icon/icon"
import Link from "@/link/link"
import { shuffle } from "$/shuffle/shuffle"
import { Controller } from "$/theme/provider"

import "@/hero/hero.css"

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
        fps: 60,
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
    { name: "hero-ski", markup: <span>{`accessability`}</span> },
    { name: "hero-sin", markup: <span>{`contrast check`}</span> },
    { name: "hero-sin", markup: <span>{`contrast check`}</span> },
    { name: "hero-sin", markup: <span>{`contrast check`}</span> },
  ],
  "work": [
    { name: "hero-now", 
      markup: 
      <span>{`seb`}</span> },
    { name: "hero-loc", markup: <span>{`green`}</span> },
  ],
  "searching": [
    {
      name: "hero-fka",
      markup: (
        <>
          <span className="mono">{`Press`}</span>
          <button onClick={toggleCmd}>
            <Icon name="cmd-search" />
            {isWindows ? <span>{`/`}</span> : <span>{`⌘K`}</span>}
          </button>
          <span className="mono">{`to start`}</span>
          <span>{`⌃`}</span>
        </>
      ),
    },
  ]
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
      </div>
    </div>
  )
}
