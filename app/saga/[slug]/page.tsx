import type { Metadata, ResolvingMetadata } from "next"
import Head from "next/head"
import { notFound } from "next/navigation"
import Script from "next/script"
import MAP from "@/map/map"
import { allPosts, Post } from "content"
import { format, parseISO } from "date-fns"
import { Mdx } from "m/mdx"

export default function Component({ params }: { params: { slug: string } }) {
  const { slug } = params

  const component = allPosts.find((component) => component.slug === slug)

  if (!component) {
    notFound()
  }

  const { body } = component

  return (
    <>
      <Mdx code={body.code} globals={{ slug }} />
      <MAP headings={component?.headings} title={component.title} />
      <time dateTime={component.last_edited} title="Last updated">
        {format(parseISO(component.last_edited), "d LLL, yyyy '/' HH:mm")}
      </time>
    </>
  )
}
