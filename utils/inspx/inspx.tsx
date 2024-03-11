import * as React from "react"
import { InspectProps } from "inspx"

const Inspect = React.lazy(() => import("inspx"))

export default function Inspx(props: InspectProps) {
  if (process.env.NODE_ENV === "production") {
    return props.children
  }
  return (
    <React.Suspense fallback={null}>
      <Inspect
        margin={false}
        size={true}
        padding={true}
        disabled={false}
        {...props}
      />
    </React.Suspense>
  )
}
