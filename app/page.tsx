"use client"

import React, { useContext } from "react"
import Hero from "@/hero/hero"
import Home from "&/home/home"
import { DataContext } from "$/content/provider"

export default function HomePage() {
  const { data } = useContext(DataContext)

  if (!data || !data.pages) {
    return "Loading..."
  }

  const { title, description, content } = data.pages[0]

  return (
    <Home>
      <Hero />
    </Home>
  )
}
