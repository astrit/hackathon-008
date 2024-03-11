import { ReactNode } from "react"
import Menu from "@/menu/menu"
import Nav from "@/nav/nav"
import Nobori from "@/nobori/nobori"
import Search from "@/search/search"
import { Toggle } from "@/toggle/toggle"

import "@/header/header.css"

import Icon from "@/icon/icon"
import Separator from "@/separator/separator"
import Status from "@/status/status"
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
      <Right>Right side</Right>
    </header>
  )
}
