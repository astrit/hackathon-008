"use client"

import { useContext, useEffect, useRef, useState } from "react"
import Icon from "@/icon/icon"

import "@/search/search.css"

import { Controller } from "$/theme/provider"

export default function Search() {
  const { toggleCmd } = useContext(Controller)
  return (
    <button className="search-top" onClick={toggleCmd}>
      <Icon name="search" height="10" /> Ask AI
    </button>
  )
}
