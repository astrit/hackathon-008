import localFont from "next/font/local"

const T26 = localFont({
  src: [
    {
      path: "../../public/fonts/t26-normal.woff",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/fonts/t26-bold.woff",
      style: "normal",
      weight: "700",
    },
    // font-feature-settings: 'calt', 'clig', 'kern', 'liga', 'locl', 'rlig';
  ],
  variable: "--font-t26",
  display: "block",
})
export const fontVariable = T26.variable
export default T26
