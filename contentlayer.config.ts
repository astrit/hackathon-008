import { makeSource } from "contentlayer/source-files"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { Post } from "./utils/content/types/Post"
import { Bit } from "./utils/content/types/Bit"
import { Video } from "./utils/content/types/Video"
import {
  rehypePrettyCodeClasses,
  rehypePrettyCodeOptions,
} from "./utils/content/code"

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Video, Bit],
  mdx: {
    esbuildOptions(options) {
      options.target = "esnext"
      return options
    },
    remarkPlugins: [[remarkGfm]],
    rehypePlugins: [
      rehypeSlug,
      //@ts-ignore
      [rehypePrettyCode, rehypePrettyCodeOptions],
      [rehypePrettyCodeClasses],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          properties: {
            className: "anchor",
          },
        },
      ],
    ],
  },
})