"use client"

import React, { ReactNode } from "react"
import Inspx from "$/inspx/inspx"

import "&/main/main.css"

interface MainProps {
  children: ReactNode
  // Add other props here
}

const Main = ({ children, ...rest }: MainProps) => {
  return <main {...rest}>{children}</main>
}
export default Main
