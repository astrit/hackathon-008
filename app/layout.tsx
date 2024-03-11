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
    default: "Astrit",
    template: "%s · Astrit",
  },
  description: "",
  openGraph: {
    title: "Astrit · Designer Engineer based in SMAPkholm",
    description: "",
    url: "https://astrit.co",
    siteName: "Astrit",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `https://astrit.co/og?title=Astrit`,
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
