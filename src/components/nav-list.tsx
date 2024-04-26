"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavListProps {
  items?: NavGroup[];
  className?: string;
}

export interface NavGroup {
  title: string;
  children: NavLink[];
}
export interface NavLink {
  path: string;
  title: string;
}

export default function NavList({ items, className }: NavListProps) {
  const pathname = usePathname();

  return (
    <nav className={clsx("text-base lg:text-sm", className)}>
      <ul role="list" className="space-y-9">
        {items?.map(({ title, children }, i) => (
          <li key={i}>
            <h2 className="font-medium">{title}</h2>
            <ul
              role="list"
              className="mt-2 space-y-2 border-l-2 border-base-content/10 lg:mt-4 lg:space-y-4"
            >
              {children?.map(({ title, path }, i) => (
                <li key={i} className="relative">
                  <Link
                    href={path || ""}
                    className={clsx(
                      "block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:transition-opacity",
                      path === pathname
                        ? "font-semibold text-primary before:bg-primary"
                        : "text-slate-500 before:bg-slate-300 before:opacity-0 hover:text-slate-600 hover:before:opacity-100 dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300",
                    )}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
