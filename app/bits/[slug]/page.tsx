import { notFound } from "next/navigation"
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
      <time dateTime={last_edited} title="Last updated">
        {format(parseISO(last_edited), "d LLL, yyyy '/' HH:mm")}
      </time>
    </>
  )
}
