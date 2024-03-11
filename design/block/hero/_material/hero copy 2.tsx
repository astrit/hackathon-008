"use client"

import { useContext, useEffect, useRef, useState } from "react"
import Green GPT from "@/astrit/astrit"
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

  // useEffect(() => {
  //   if (heroRef.current) {
  //     const shuffleMe = heroRef.current.querySelectorAll(".hero span")

  //     import("shuffle-letters").then((module) => {
  //       const shuffleLetters = module.default as unknown as (
  //         element: HTMLElement,
  //         options: ShuffleOptions
  //       ) => void

  //       Array.prototype.forEach.call(
  //         shuffleMe,
  //         (element: HTMLElement, index: number) => {
  //           const options: ShuffleOptions = {
  //             iterations: 12,
  //             fps: 26,
  //             onComplete: (elm) => {
  //               if (index === shuffleMe.length - 1) {
  //                 console.log("Done shuffling")
  //               }
  //             },
  //           }
  //           shuffleLetters(element, options)
  //         }
  //       )
  //     })
  //   }
  // }, [context])

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

  // prettier-ignore
  const heroItems: { [key: string]: HeroItem[] } = {
  "intro": [
    { name: "hero-ski", markup: <span>{`deƨign · cod>_ · oss`}</span> },
    { name: "hero-sin", markup: <span>{`スタート ~ 2008`}</span> },
    { name: "hero-eps", 
      markup: 
      <>
        <span>{`©`}</span>
        <span>{`≈`}</span>
        <Link href="https://css.gg" >
          <span>{`CSS.GG ↗`}</span>
        </Link>
        <span> & </span>
        <Link href="https://glyf.app" >
          <span>{`GLYF.APP ↗`}</span>
        </Link>
      </> },
  ],
  "work": [
    { name: "hero-now", 
      markup: 
        <>
          <span>{`Design`}</span>
          <span>{`×`}</span>
          <span>{`Code`}</span>
          <span>{`~`}</span>
          <Link href="https://glyf.app">
            <span>{`SEB™`}</span>
          </Link>
        </> },
    { name: "hero-loc", markup: <span>{`↪ Stockholm, Sweden`}</span> },
  ],
  "skills": [
    { name: "hero-pro", markup: <><span>{`スキル`}</span> <span>{`×`}</span> <span className="mono">{`</> {@} ($) [:]`}</span></> },
  ],
  "searching": [
    {
      name: "hero-fka",
      markup: (
        <>
          <span className="mono">{`Press`}</span>
          <button onClick={toggleCmd}>
            <Icon name="cmd-search" />
            <span>{`⌘K`}</span>
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
      <Green GPT />
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
