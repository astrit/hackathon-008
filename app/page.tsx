"use client"

import React, { useContext } from "react"
import Hero from "@/hero/hero"
import Link from "@/link/link"
import List from "@/list/list"
import { Tweet } from "@/tweet/tweet"
import Content from "&/content/content"
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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </Home>
  )
}
