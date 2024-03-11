import type { Metadata, ResolvingMetadata } from "next"
import Head from "next/head"
import { notFound } from "next/navigation"
import Script from "next/script"
import MAP from "@/map/map"
import { allBits } from "content"
import { format, parseISO } from "date-fns"
import { Mdx } from "m/mdx"

export default function Bit({ params }: { params: { slug: string } }) {
  const { slug } = params

  const bit = allBits.find((bit) => bit.slug === slug)

  if (!bit) {
    notFound()
  }

  const { body, title, headings, last_edited, publishedAt } = bit
  const { code } = body

  return (
    <>
      <Mdx code={code} globals={{ slug }} />
      <MAP headings={headings} title={title} published={publishedAt} />
      <time dateTime={last_edited} title="Last updated">
        {format(parseISO(last_edited), "d LLL, yyyy '/' HH:mm")}
      </time>
    </>
  )
}
