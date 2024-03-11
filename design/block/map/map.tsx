"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { format, parseISO } from "date-fns"

import "@/map/map.css"

import Like from "@/like/like"

interface Heading {
  slug: string
  text: string
  level: number
}

interface MAPProps {
  headings: Heading[]
  title: string
  published?: string
}

const Arrow = () => {
  return (
    <div className="disclosure" aria-label="Expand" tabIndex={0}>
      <svg viewBox="0 0 24 24">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  )
}

const MAP: React.FC<MAPProps> = ({ headings, title, published }) => {
  const [activeId, setActiveId] = useState("")
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i]
        const element = document.getElementById(heading.slug)

        if (element && element.offsetTop <= scrollPosition + 161) {
          setActiveId(heading.slug)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [headings])

  const handleClick = (slug: string) => {
    setActiveId(slug)
  }

  const groupedHeadings: (Heading | Heading[])[] = headings.reduce(
    (acc: (Heading | Heading[])[], heading: Heading) => {
      if (heading.level > 2) {
        const lastItem = acc[acc.length - 1]
        if (Array.isArray(lastItem)) {
          lastItem.push(heading)
        } else {
          throw new Error(
            "Level 3 and 4 headings should be after a level 2 heading."
          )
        }
      } else if (heading.level === 2) {
        const nextHeadingIndex = headings.indexOf(heading) + 1
        if (
          headings[nextHeadingIndex] &&
          headings[nextHeadingIndex].level > 2
        ) {
          acc.push([heading])
        } else {
          acc.push(heading)
        }
      } else {
        acc.push(heading)
      }
      return acc
    },
    []
  )

  return (
    <div className="map">
      <div className="details">
        <time dateTime={published} title="Last updated">
          {format(parseISO(published ?? ""), "LLL d, yyyy")}
        </time>
        · 20,302 views · 225,036 likes
      </div>
      <details className="series">
        <summary>
          Part of <strong>Series</strong> 1 of 4
        </summary>
        <Link href="/series/1">Part 1</Link>
        <Link href="/series/2">Part 2</Link>
        <Link href="/series/3">Part 3</Link>
      </details>
      <span>On this page</span>
      <nav data-name={headings.length > 0 ? "On this page" : ""}>
        <Link
          key={`#top`}
          href={`#top`}
          data-id={"top"}
          data-level={"1"}
          onClick={() => handleClick("top")}
          passHref
        >
          {title}
        </Link>

        {groupedHeadings.map((item, index) =>
          Array.isArray(item) ? (
            <details
              key={index}
              open={item.some((heading) => heading.slug === activeId)}
            >
              <summary>
                <Link
                  key={`#${item[0].slug} + ${index} + ${headings.length}`}
                  href={`#${item[0].slug}`}
                  className={`map-link ${
                    activeId === item[0].slug ? "active" : ""
                  }`}
                  data-id={item[0].slug}
                  data-level={item[0].level}
                  onClick={() => handleClick(item[0].slug)}
                  passHref
                >
                  {item[0].text}
                </Link>
                <Arrow />
              </summary>
              {item.slice(1).map((heading) => (
                <Link
                  key={`#${heading.slug} + ${index} + ${headings.length}`}
                  href={`#${heading.slug}`}
                  className={`map-link ${
                    activeId === heading.slug ? "active" : ""
                  }`}
                  data-id={heading.slug}
                  data-level={heading.level}
                  onClick={() => handleClick(heading.slug)}
                  passHref
                >
                  {heading.text}
                </Link>
              ))}
            </details>
          ) : (
            <Link
              // key={`#${item.slug}`}
              key={`#${item.slug} + ${index} + ${headings.length}`}
              href={`#${item.slug}`}
              className={`map-link ${activeId === item.slug ? "active" : ""}`}
              data-id={item.slug}
              data-level={item.level}
              onClick={() => handleClick(item.slug)}
              passHref
            >
              {item.text}
            </Link>
          )
        )}
      </nav>
      <Like />
    </div>
  )
}

export default MAP
