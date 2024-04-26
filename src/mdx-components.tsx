import type { MDXComponents } from "mdx/types";
import Image from "next/image";

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    ...components,
    img: ({ src, alt }) => (
      <Image
        src={src!}
        width={600}
        height={400}
        alt={alt!}
        unoptimized={src?.endsWith(".gif")}
        className="object-scale-down"
      />
    ),
  };
}
