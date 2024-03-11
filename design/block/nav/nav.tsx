"use client"

import { useContext } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "@/link/link"
import { Controller } from "$/theme/provider"

import "@/nav/nav.css"

const Links = [
  { href: "/", label: "Green GPT" },
  { href: "/features", label: "Features" },
  { href: "/a11y", label: "Check" },
]

export default function Nav() {
  const current = usePathname()
  return (
    <nav>
      {Links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={current === href ? "active" : ""}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
