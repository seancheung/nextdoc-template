"use client";

import "@docsearch/css";
import { DocSearch } from "@docsearch/react";
import "./site-search.css";

export interface SiteSearchProps {
  children?: React.ReactNode;
}

export default function SiteSearch(props: SiteSearchProps) {
  if (
    !process.env.NEXT_PUBLIC_ALGORA_APPID ||
    !process.env.NEXT_PUBLIC_ALGORA_INDEX_NAME ||
    !process.env.NEXT_PUBLIC_ALGORA_API_KEY
  ) {
    return null;
  }
  return (
    <DocSearch
      appId={process.env.NEXT_PUBLIC_ALGORA_APPID}
      indexName={process.env.NEXT_PUBLIC_ALGORA_INDEX_NAME}
      apiKey={process.env.NEXT_PUBLIC_ALGORA_API_KEY}
    />
  );
}
