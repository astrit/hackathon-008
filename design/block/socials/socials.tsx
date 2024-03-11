import Icon from "@/icon/icon"
import Link from "@/link/link"

import "@/socials/socials.css"

export default function Socials() {
  const links = [
    { href: "https://github.com/astrit", number: 9107, icon: "github" },
    { href: "https://www.youtube.com/astrit", number: 2530, icon: "youtube" },
    {
      href: "https://twitter.com/astritmalsija",
      number: 1508,
      icon: "x",
    },
  ]

  return (
    <div className="socials">
      {links.map(({ href, number, icon }, index) => (
        <Link key={index} href={href} target="_blank">
          <Icon name={icon} viewBox="" />
          {number.toLocaleString()}
        </Link>
      ))}
    </div>
  )
}
