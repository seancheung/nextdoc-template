import createMDX from "@next/mdx";
import rehypeShiki from "@shikijs/rehype";
import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import remarkGfm from "remark-gfm";
import remarkReadingTime from "remark-reading-time";
import remarkExternalLink from "./src/plugins/remark-external-link.mjs";
import remarkFrontmatter from "./src/plugins/remark-frontmatter.mjs";
import remarkHeading from "./src/plugins/remark-heading.mjs";
import remakrLayout from "./src/plugins/remark-layout.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx", "md"],
};

/** @type {import('@shikijs/rehype').RehypeShikiOptions} */
const shikiConfig = {
  theme: "tokyo-night",
  transformers: [
    transformerNotationDiff(),
    transformerNotationHighlight(),
    transformerNotationWordHighlight(),
    transformerNotationFocus(),
  ],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkGfm,
      remarkReadingTime,
      remarkHeading,
      remarkExternalLink,
      [
        remakrLayout,
        { layoutWrapper: "@/components/mdx-layout-wrapper", pages: "@/pages" },
      ],
    ],
    rehypePlugins: [[rehypeShiki, shikiConfig]],
  },
});

export default withMDX(nextConfig);
