import React from "react"
import icons from "+/icons.json"

interface IconProps {
  name: string
  viewBox?: string
  [rest: string]: any
}

const Icon = ({ name, viewBox, ...rest }: IconProps) => {
  const icon = icons.icons.find((icon: { name: string }) => icon.name === name)

  if (!icon) {
    return null
  }

  return (
    <svg
      viewBox={viewBox ? viewBox : icon.box}
      dangerouslySetInnerHTML={{ __html: icon.path }}
      {...rest}
    />
  )
}

export default Icon
