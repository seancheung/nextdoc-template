"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { NavGroup, NavLink } from "./nav-list";

export interface ArticlePaginationProps {
  navs: NavGroup[];
  children?: React.ReactNode;
}

export default function ArticlePagination({ navs }: ArticlePaginationProps) {
  const [prev, next] = useNavigation(navs);

  return (
    <dl className="mt-12 flex border-t border-base-content/20 pt-6 print:hidden">
      {prev && (
        <div>
          <dt className="text-sm font-medium text-base-content/90">Previous</dt>
          <dd className="mt-1">
            <Link
              className="flex flex-row-reverse items-center gap-x-1 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
              href={prev.path}
            >
              {prev.title}
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="h-4 w-4 flex-none -scale-x-100 fill-current"
              >
                <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z"></path>
              </svg>
            </Link>
          </dd>
        </div>
      )}
      {next && (
        <div className="ml-auto text-right">
          <dt className="text-sm font-medium text-base-content/90">Next</dt>
          <dd className="mt-1">
            <Link
              className="flex items-center gap-x-1 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
              href={next.path}
            >
              {next.title}
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="h-4 w-4 flex-none fill-current"
              >
                <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z"></path>
              </svg>
            </Link>
          </dd>
        </div>
      )}
    </dl>
  );
}

function useNavigation(items: NavGroup[]): [NavLink | null, NavLink | null] {
  const pathname = usePathname();
  const flatterned = useMemo<NavLink[]>(
    () => items.reduce((p, g) => p.concat(...g.children), [] as NavLink[]),
    [items],
  );
  const index = useMemo(
    () => flatterned.findIndex((e) => e.path === pathname),
    [flatterned, pathname],
  );
  const prev = useMemo<NavLink | null>(
    () => (index > 0 ? flatterned[index - 1] : null),
    [flatterned, index],
  );
  const next = useMemo<NavLink | null>(
    () => (index < flatterned.length - 1 ? flatterned[index + 1] : null),
    [flatterned, index],
  );
  return [prev, next];
}
