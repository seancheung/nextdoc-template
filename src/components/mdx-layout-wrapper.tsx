import { ReactNode } from "react";
import ArticleWrapper, { ReadingTime } from "./article-wrapper";
import Header from "./header";
import HeroSection from "./hero-section";
import NavList, { NavGroup } from "./nav-list";
import TableOfContents, { TocItem } from "./table-of-contents";
import { createTrees } from "./utils";

export interface MdxMetadata {
  headings?: Heading[];
  readingTime?: ReadingTime;
  frontmatter?: Frontmatter;
}

export interface Heading {
  id: string;
  title: string;
  level: number;
}

export interface Frontmatter {
  header?: boolean;
  hero?: boolean;
  nav?: boolean;
  toc?: boolean;
}

export interface MdxDocumentProps {
  metadata?: MdxMetadata;
  pages: NavGroup[];
  children?: React.ReactNode;
}
function MdxDocument({ metadata, pages, children }: MdxDocumentProps) {
  const toc: TocItem[] | undefined =
    metadata?.headings && createTrees(metadata.headings);
  return (
    <div className="flex w-full flex-col">
      {metadata?.frontmatter?.header !== false && <Header navs={pages} />}
      {metadata?.frontmatter?.hero && <HeroSection />}
      <div className="relative mx-auto flex w-full max-w-screen-3xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
        {metadata?.frontmatter?.nav !== false && (
          <div className="hidden lg:relative lg:block lg:flex-none">
            <div className="absolute inset-y-0 right-0 w-[50vw] bg-base-200/20"></div>
            <div className="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
              <NavList items={pages} />
            </div>
          </div>
        )}
        <ArticleWrapper readingTime={metadata?.readingTime} navs={pages}>
          {children}
        </ArticleWrapper>
        {metadata?.frontmatter?.toc !== false && (
          <TableOfContents items={toc} />
        )}
      </div>
    </div>
  );
}

export default function layoutWrapper(
  metadata: MdxMetadata,
  pages: NavGroup[],
) {
  return function MDXPage({ children }: { children?: ReactNode }) {
    return (
      <MdxDocument metadata={metadata} pages={pages}>
        {children}
      </MdxDocument>
    );
  };
}
