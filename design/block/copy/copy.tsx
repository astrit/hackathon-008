import "@/copy/copy.css"

export default function Copy() {
  const year = new Date().getFullYear()
  const symbol = "\u00A9"
  const text = `${symbol} ${year}`
  return <cite>{text}</cite>
}
