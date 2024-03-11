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

      LIST.current.addEventListener("scroll", handleScroll)

      const scrolledInItems: Element[] = []

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              scrolledInItems.push(entry.target)
              entry.target.classList.remove("out") // Remove the 'out' class
              entry.target.classList.add("in") // Add the 'in' class
            } else {
              const index = scrolledInItems.indexOf(entry.target)
              if (index !== -1) {
                scrolledInItems.splice(index, 1)
              }
              entry.target.classList.remove("in") // Remove the 'in' class
              entry.target.classList.add("out") // Add the 'out' class
            }
          })
        },
        { root: LIST.current, rootMargin: "-10% 0px" }
      )

      LIST.current.querySelectorAll(".item").forEach((link) => {
        observer.observe(link)
      })

      return () => {
        if (LIST.current) {
          LIST.current.removeEventListener("in", handleScroll)

          LIST.current.querySelectorAll(".item").forEach((link) => {
            observer.unobserve(link)
          })
        }
      }
    }
  }, [audioRef])

  return (
    <div className="list-mask">
      <div className="list masked" ref={LIST}>
        {Array(10)
          .fill(posts)
          .flat()
          .map((post, idx) => (
            <Link href={slug || "/"} key={idx} className="item">
              <div className="title">{title}</div>
              <summary>
                <time>{publishedAt}</time>·<span>{"12k"}views</span>
              </summary>
            </Link>
          ))}
      </div>
      <figure></figure>
    </div>
  )
}
