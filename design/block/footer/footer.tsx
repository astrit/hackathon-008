"use client"

import React, { useEffect, useRef } from "react"
import Address from "@/address/address"
import Copy from "@/copy/copy"
import Forecast from "@/forecast/forecast"
import Pixels from "@/pixels/pixels"
import Progress from "@/progress/progress"
import Socials from "@/socials/socials"
import Time from "@/time/time"
import Views from "@/views/views"

import "@/footer/footer.css"

import Settings from "@/settings/settings"

function Split() {
  return <span className="split">·</span>
}

function Left({ children }: { children?: React.ReactNode }) {
  return <div className="sides left">{children}</div>
}

function Right({ children }: { children?: React.ReactNode }) {
  const elements = [
    <Pixels />,
    <Views />,
    <Time />,
    <Forecast />,
    <Address />,
    <Settings />,
  ]
  return <div className="sides right">test</div>
}

export default function Footer() {
  return (
    <footer>
      <Left>Test</Left>
      <Right />
    </footer>
  )
}
