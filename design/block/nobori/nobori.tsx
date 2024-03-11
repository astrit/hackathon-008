"use client"

import { usePathname, useRouter } from "next/navigation"

import "@/nobori/nobori.css"

export default function Nobori() {
  const router = useRouter()
  const goToBrand = (event: React.MouseEvent) => {
    event.preventDefault()
    router.push("/brand")
  }

  return (
    <div className="nobori" onContextMenu={goToBrand}>
      <span>カ ス ケ ー ド</span>
    </div>
  )
}
