import React, { ReactNode } from "react"

import "&/content/content.css"

interface ContentProps {
  children: ReactNode
}

const Content = ({ children, ...rest }: ContentProps) => {
  return <section {...rest}>{children}</section>
}
export default Content
