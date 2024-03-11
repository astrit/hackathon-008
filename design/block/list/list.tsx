"use client"

import { useContext, useEffect, useRef } from "react"
import Link from "@/link/link"
import { Controller } from "$/theme/provider"
import { allPosts } from "content"

import "@/list/list.css"

export default function List() {
  const LIST = useRef<HTMLDivElement | null>(null)
  const { isAudio, audioRef, toggleAudio } = useContext(Controller)

  const posts = allPosts
    .filter((post) => post._raw.sourceFileName)
    .sort((a, b) => a.title.localeCompare(b.title))

  const { slug, title, publishedAt } = posts[0]
  useEffect(() => {
    if (audioRef && LIST.current) {
      const handleScroll = () => {
        const scrollDistance = Math.floor(LIST.current?.scrollTop || 0)

        if (audioRef.current) {
          for (let i = 0; i < scrollDistance; i++) {
            audioRef.current.currentTime = 0.01
            audioRef.current.play()
          }
        }
      }
    }
  }, [audioRef])

  return (
    <>
      <div className="list" ref={LIST}>
        {Array(2)
          .fill(posts)
          .flat()
          .map((post, idx) => (
            <div className="deco" key={idx}>
              <Link href={`lore/` + slug || "/"} className="item">
                {/* <figure className="cover">DEMO</figure> */}
                <div className="title">{title}</div>
                <summary>
                  <time>{publishedAt}</time>·<span>{"12k"}views</span>
                </summary>
              </Link>
              <figure className="glow"></figure>
            </div>
          ))}
      </div>
    </>
  )
}
