"use client"

import { useContext, useEffect, useRef, useState } from "react"
import Icon from "@/icon/icon"
import { Controller } from "$/theme/provider"

export default function Search() {
  const { toggleCmd } = useContext(Controller)
  return (
    <button onClick={toggleCmd}>
      <Icon name="search" height="10" />
    </button>
  )
}
