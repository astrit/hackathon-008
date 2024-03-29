"use client"

import "@/cmd/cmd.css"

import React from "react"
import Icon from "@/icon/icon"
import { Command } from "cmdk"

export function CMD({
  isOpen,
  toggleCmd,
}: {
  isOpen: boolean
  toggleCmd: () => void
}) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [inputValue, setInputValue] = React.useState("")
  // const [open, setOpen] = React.useState(false)
  const [pages, setPages] = React.useState<string[]>(["home"])
  const activePage = pages[pages.length - 1]
  const isHome = activePage === "home"

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e: {
      key: string
      metaKey: any
      ctrlKey: any
      preventDefault: () => void
    }) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleCmd()
        // setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const popPage = React.useCallback(() => {
    setPages((pages) => {
      const x = [...pages]
      x.splice(-1, 1)
      return x
    })
  }, [])

  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (isHome || inputValue.length) {
        return
      }

      if (e.key === "Backspace") {
        e.preventDefault()
        popPage()
      }
    },
    [inputValue.length, isHome, popPage]
  )

  function bounce() {
    if (ref.current) {
      ref.current.style.transform = "scale(0.96)"
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transform = ""
        }
      }, 100)

      setInputValue("")
    }
  }

  const backDrop = ["backdrop", isOpen ? "open" : " "].join(" ")

  return (
    <>
      <div className={backDrop}></div>
      <Command.Dialog
        ref={ref}
        open={isOpen}
        onOpenChange={toggleCmd}
        className="dark"
        label="Global Command Menu"
        loop
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "Enter") {
            bounce()
          }

          if (isHome || inputValue.length) {
            return
          }

          if (e.key === "Backspace") {
            e.preventDefault()
            popPage()
            bounce()
          }
        }}
      >
        <div>
          {pages.map((p) => (
            <div key={p} cmdk-vercel-badge="">
              {p}
            </div>
          ))}
        </div>
        <Command.Input
          autoFocus
          placeholder="What do you need?"
          onValueChange={(value) => {
            setInputValue(value)
          }}
        />
        <Command.List>
          {/* <Command.Empty>No results found.</Command.Empty> */}
          {activePage === "home" && (
            <Home searchProjects={() => setPages([...pages, "green-gpt"])} />
          )}
          {activePage === "green-gpt" && <Projects />}
        </Command.List>
      </Command.Dialog>
    </>
  )
}

function Home({ searchProjects }: { searchProjects: Function }) {
  return (
    <>
      <Command.Group data-ai>
        <Item
          shortcut="⇧ A"
          onSelect={() => {
            searchProjects()
          }}
        >
          Ask AI
        </Item>
      </Command.Group>

      <Command.Group heading="Voice & Motion">
        <Item shortcut="⌃ C">
          <Icon name="motion" height="10" />
          Motion Gestures
        </Item>
        <Item shortcut="⌃ V">
          <Icon name="voice" height="10" /> Voice Commands
        </Item>
      </Command.Group>
      <Command.Group heading="A11y">
        <Item shortcut="⌘ C">
          <Icon name="plus" height="10" /> Check contrast
        </Item>
        <Item shortcut="⌘ C">
          <Icon name="plus" height="10" /> Increase Contrast
        </Item>
        <Item shortcut="⌘ M">
          <Icon name="plus" height="10" /> Reduce Motion
        </Item>
        <Item shortcut="⌘ T">
          <Icon name="plus" height="10" /> Reduce Transparency
        </Item>
        <Item shortcut="\">
          <Icon name="plus" height="10" /> Change Theme
        </Item>
      </Command.Group>
    </>
  )
}

function Projects() {
  return (
    <>
      <div className="cmd-chat">chat</div>

      {/* <Item>Project 1</Item>
      <Item>Project 2</Item>
      <Item>Project 3</Item>
      <Item>Project 4</Item>
      <Item>Project 5</Item>
      <Item>Project 6</Item> */}
    </>
  )
}

function Item({
  children,
  shortcut,
  onSelect = () => {},
}: {
  children: React.ReactNode
  shortcut?: string
  onSelect?: (value: string) => void
}) {
  return (
    <Command.Item onSelect={onSelect}>
      {children}
      {shortcut && (
        <div cmdk-vercel-shortcuts="">
          {shortcut.split(" ").map((key) => {
            return <kbd key={key}>{key}</kbd>
          })}
        </div>
      )}
    </Command.Item>
  )
}
