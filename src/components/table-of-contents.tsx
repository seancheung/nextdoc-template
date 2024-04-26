"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export interface TocItem {
  id: string;
  title: string;
  children?: TocItem[];
}

export interface TableOfContentsProps {
  items?: TocItem[];
  className?: string;
}

export default function TableOfContents({
  items,
  className,
}: TableOfContentsProps) {
  const activeId = useHeadingObserver();

  return (
    <div
      className={clsx(
        "hidden xl:sticky xl:top-[4.75rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6",
        className,
      )}
    >
      <nav aria-labelledby="on-this-page-title" className="w-56">
        <h2 id="on-this-page-title" className="text-sm font-medium">
          On this page
        </h2>
        <ol role="list" className="mt-4 space-y-3 text-sm text-base-content/90">
          {items?.map(({ id, title, children }, i) => (
            <li key={i}>
              <TocLink id={id} title={title} activeId={activeId} />
              <ol
                role="list"
                className="mt-2 space-y-3 pl-5 text-base-content/80"
              >
                {children?.map(({ id, title }, i) => (
                  <li key={i}>
                    <TocLink id={id} title={title} activeId={activeId} />
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

interface TocLinkProps {
  id: string;
  title: string;
  activeId?: string;
}
function TocLink({ id, title, activeId }: TocLinkProps) {
  return (
    <Link
      scroll
      href={`#${id}`}
      className={clsx(
        activeId === id
          ? "text-primary"
          : "hover:text-slate-600 dark:hover:text-slate-300",
      )}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(`#${id}`)?.scrollIntoView({
          behavior: "smooth",
        });
      }}
    >
      {title}
    </Link>
  );
}

function useHeadingObserver() {
  const observer = useRef<IntersectionObserver>();
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleObsever: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: "0px 0px -50% 0px",
    });

    const elements = document.querySelectorAll(
      "article h2[id], article h3[id], article h4[id]",
    );
    elements.forEach((elem) => observer.current?.observe(elem));
    const current = observer.current;
    return () => current?.disconnect();
  }, []);

  return activeId;
}
