import clsx from "clsx";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { NavGroup } from "./nav-list";
import SiteSearch from "./site-search/site-search";
import ThemeSwitch from "./theme-switch";

export interface HeaderProps {
  navs?: NavGroup[];
  className?: string;
}

export default function Header({ navs, className }: HeaderProps) {
  return (
    <header
      className={clsx(
        "sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-base-100 px-4 py-5 shadow-md shadow-slate-900/5 sm:px-6 lg:px-8 dark:bg-base-100/5 dark:shadow-none dark:backdrop-blur print:hidden dark:[@supports(backdrop-filter:blur(0))]:bg-base-100/25",
        className,
      )}
    >
      <div className="relative mr-6 lg:hidden">
        <MobileMenu navs={navs} />
      </div>
      <div className="flex flex-grow basis-0 items-center justify-start">
        <div>
          <Link href="/" className="relative">
            {/* Logo */}
          </Link>
        </div>
      </div>
      <div className="-my-5 mr-6 sm:mr-8 md:mr-0">
        <SiteSearch />
      </div>
      <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow">
        <ThemeSwitch />
      </div>
    </header>
  );
}
