import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const postTitle = searchParams.get("title")

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          padding: "200px",
          gap: "100px",
          fontFamily: "sans-serif",
        }}
      >
        <svg height="100" viewBox="0 0 29 24"></svg>
        <div
          style={{
            display: "flex",
            fontSize: 100,
            letterSpacing: "-0.05em",
            fontStyle: "normal",
            fontWeight: "100",
            color: "white",
            lineHeight: "120px",
            whiteSpace: "pre-wrap",
          }}
        >
          {postTitle}
        </div>
        <footer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
            fontSize: "40px",
            color: "#ffffff",
          }}
        >
          <div className="bottom">seb-greeb.vercel.app</div>
        </footer>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
    }
  )
}
