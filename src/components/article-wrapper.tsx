import clsx from "clsx";
import ArticlePagination from "./article-pagination";
import { NavGroup } from "./nav-list";

export interface ReadingTime {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

export interface ArticleWrapperProps {
  navs?: NavGroup[];
  readingTime?: ReadingTime;
  children?: React.ReactNode;
  className?: string;
}

export default function ArticleWrapper({
  navs,
  children,
  className,
}: ArticleWrapperProps) {
  return (
    <div
      className={clsx(
        "min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16",
        className,
      )}
    >
      <article className="prose prose-slate max-w-none dark:prose-invert prose-pre:rounded-none">
        {children}
      </article>
      {navs && <ArticlePagination navs={navs} />}
    </div>
  );
}
