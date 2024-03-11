import React from "react"
import type { ImageProps } from "next/image"
import NextImage from "next/image"

export const BlurImage = (props: ImageProps) => {
  const [isLoading, setLoading] = React.useState(true)

  return (
    <div className={isLoading ? "animate-pulse" : ""}>
      <NextImage
        {...props}
        className={
          isLoading
            ? "scale-[1.02] blur-xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        }
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  )
}
