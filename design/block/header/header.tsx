import { ReactNode } from "react"
import Nav from "@/nav/nav"

import "@/header/header.css"

import Tunes from "@/tunes/tunes"

function Left({ children }: { children: ReactNode }) {
  return <div className="sides left">{children}</div>
}

function Right({ children }: { children: ReactNode }) {
  return <div className="sides right">{children}</div>
}
export default function Header() {
  return (
    <header>
      <Left>
        <Nav />
      </Left>
      <Right>
        <Tunes />
      </Right>
    </header>
  )
}
