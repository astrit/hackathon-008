"use client"

import { useContext, useEffect, useRef } from "react"
import Icon from "@/icon/icon"
import { Controller } from "$/theme/provider"

import "@/tunes/tunes.css"

export default function Tunes() {
  const { isAudio, toggleAudio } = useContext(Controller)
  const classes = ["tunes"]

  if (isAudio) {
    classes.push("on")
  }

  return (
    <button onClick={toggleAudio} className={classes.join(" ")}>
      <Icon name="tunes" height="10" />
    </button>
  )
}
