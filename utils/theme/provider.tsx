"use client"

import React, { createContext, useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { CMD } from "@/cmd/cmd"
import Cursor from "@/cursor/cursor"
import Motion from "@/motion/motion"
import Voice from "@/voice/voice"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { Toaster } from "sonner"

type ControllerContextType = {
  isOpen: boolean
  isNavOpen: boolean
  isAudio: boolean
  audioRef: React.MutableRefObject<HTMLAudioElement | null>
  pole: React.MutableRefObject<null> | null
  toggleCmd: () => void
  toggleNav: () => void
  toggleAudio: () => void
}

export const Controller = createContext<ControllerContextType>({
  isOpen: false,
  isNavOpen: false,
  isAudio: false,
  audioRef: { current: null },
  pole: null,
  toggleCmd: () => {},
  toggleNav: () => {},
  toggleAudio: () => {},
})

export function Theme({ children, ...props }: ThemeProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isNavOpen, setNavOpen] = useState(false)
  const pole = useRef(null)
  const pathname = usePathname()
  const router = useRouter()
  const [changes, setChanges] = useState(0)

  const [isAudio, setAudio] = useState(
    () =>
      typeof window !== "undefined" && document.cookie.includes("isAudio=true")
  )

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const toggleCmd = () => {
    setIsOpen((prevOpen) => !prevOpen)
  }

  const toggleNav = () => {
    setNavOpen((prevOpen) => !prevOpen)
  }

  const toggleAudio = () => {
    setAudio((prevAudio) => {
      const newAudioState = !prevAudio
      document.cookie = `isAudio=${newAudioState}; path=/`
      return newAudioState
    })
  }

  const themeProviderValue = {
    isOpen,
    isNavOpen,
    isAudio,
    audioRef,
    pole,
    toggleCmd,
    toggleNav,
    toggleAudio,
  }

  return (
    <NextThemesProvider {...props}>
      <Controller.Provider value={themeProviderValue}>
        {children}
        <Toaster
          richColors
          theme="dark"
          position="bottom-right"
          expand={false}
          closeButton={true}
          duration={4428}
        />
        <CMD isOpen={isOpen} toggleCmd={toggleCmd} />
        <Motion />
        <Voice />
        {/* <Cursor /> */}
      </Controller.Provider>
    </NextThemesProvider>
  )
}
