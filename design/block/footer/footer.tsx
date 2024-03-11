"use client"

import React from "react"
import Pixels from "@/pixels/pixels"

import "@/footer/footer.css"

import Settings from "@/settings/settings"

function Split() {
  return <span className="split">·</span>
}

function Left({ children }: { children?: React.ReactNode }) {
  return <div className="sides left">{children}</div>
}

function Right({ children }: { children?: React.ReactNode }) {
  const elements = [<Pixels />, <Settings />]
  return (
    <div className="sides right">
      {/* {elements.map((element, index) => (
        <React.Fragment key={index}>
          {element}
          {index < elements.length - 1 && <Split />}
        </React.Fragment>
      ))} */}
      Hackathon 008
    </div>
  )
}

export default function Footer() {
  return (
    <footer>
      <Left>2024</Left>
      <Right />
    </footer>
  )
}
