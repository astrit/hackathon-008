import type { Metadata } from "next"
import Favicon from "@/fav/fav"
import Footer from "@/footer/footer"
import Header from "@/header/header"
import { Analytics } from "@vercel/analytics/react"
import Article from "&/article/article"
import Main from "&/main/main"
import { Data } from "$/content/provider"
import Fonts from "$/fonts/fonts"
import { Theme } from "$/theme/provider"

import "#/global.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://astrit.co"),
  title: {
    default: "Green GPT",
    template: "%s · Green GPT",
  },
  description: "",
  openGraph: {
    title: "Green GPT · Designer Engineer based in SMAPkholm",
    description: "",
    url: "https://astrit.co",
    siteName: "Green GPT",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `https://astrit.co/og?title=Green GPT`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body data-texture>
        <Theme
          attribute="theme"
          defaultTheme="dark"
          enableColorScheme={false}
          enableSystem={true}
        >
          <script src="//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js"></script>
          <script src="/gest.js"></script>
          {/* <script src="https://cdn.jsdelivr.net/npm/handtrackjs@0.0.6/dist/handtrack.min.js"></script>

          <script src="https://unpkg.com/@tensorflow/tfjs-core@3.7.0/dist/tf-core.js"></script>

          <script src="https://unpkg.com/@tensorflow/tfjs-backend-webgl@3.7.0/dist/tf-backend-webgl.js"></script>

          <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/hand-pose-detection@2.0.0/dist/hand-pose-detection.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/hands.min.js"></script>
          <script src="https://raw.githubusercontent.com/andypotato/fingerpose/master/dist/fingerpose.js"></script> */}

          <Favicon />
          <Data>
            <Fonts>
              <Main>
                <Header />
                <Article>{children}</Article>
                <Footer />
              </Main>
            </Fonts>
          </Data>
        </Theme>
        <Analytics />
      </body>
    </html>
  )
}
