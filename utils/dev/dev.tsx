import { ReactNode } from "react"

const Dev = ({ children }: { children: ReactNode }) => {
  const isDev = process.env.NEXT_PUBLIC_DEV_ENV === "true"

  if (!isDev) {
    return null
  }
  return children
}

export default Dev
