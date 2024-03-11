"use client"

import React, { ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import "@/trail/trail.css"

import Progress from "@/progress/progress"
import Separator from "@/separator/separator"

type TrailTypes = {
  home?: ReactNode
  separator?: ReactNode
  activeClass?: string
}

function Prev() {
  const navigation = useRouter()
  const pathName = usePathname()

  if (pathName === "/") {
    return null
  }

  const goBack = () => {
    navigation.back()
  }

  return (
    <button onClick={goBack} className="prev">
      <svg viewBox="0 0 24 24">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
  )
}

function Home() {
  return (
    <div className="go-home">
      <Progress />
    </div>
  )
}
// function Home() {
//   return (
//     <Link className="go-home" href={"/"}>
//       <Progress />
//     </Link>
//   )
// }

function Next() {
  const navigation = useRouter()
  const pathName = usePathname()

  if (pathName === "/") {
    return null
  }

  const goNext = () => {
    if (typeof window !== "undefined") {
      window.history.forward()
    }
  }
  return (
    <button onClick={goNext} className="next">
      <svg viewBox="0 0 24 24">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  )
}

// when hovering blog or bits show list of those with search function and tags make it more prominent on top of article
// when hovering blog or bits show list of those with search function and tags make it more prominent on top of article
// when hovering blog or bits show list of those with search function and tags make it more prominent on top of article
// when hovering blog or bits show list of those with search function and tags make it more prominent on top of article
// when hovering blog or bits show list of those with search function and tags make it more prominent on top of article
// when hovering blog or bits show list of those with search function and tags make it more prominent on top of article
// when hovering blog or bits show list of those with search function and tags make it more prominent on top of article
// when hovering blog or bits show list of those with search function and tags make it more prominent on top of article
// when hovering blog or bits show list of those with search function and tags make it more prominent on top of article
// prev and next on beginning instead of the home or home in between < • > then / what ever / what ever

const Trail = ({ home, separator, activeClass }: TrailTypes) => {
  const paths = usePathname()
  const pathNames = paths.split("/").filter((path) => path)

  separator = separator || <span>/</span>
  activeClass = activeClass || "active"
  home = "☉"

  return (
    <div className="trail">
      <div className="options">
        <Home />
        <div className="arrows">
          <Prev />
          <Next />
        </div>
      </div>
      <menu>
        <Link href={"/"}>{home}</Link>
        {pathNames.length > 0 && separator}
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`
          let itemLink = link
          return (
            <React.Fragment key={index}>
              <Link href={href}>{itemLink}</Link>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          )
        })}
      </menu>
    </div>
  )
}

export default Trail
