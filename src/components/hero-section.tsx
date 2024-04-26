import clsx from "clsx";
import Link from "next/link";

export interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className }: HeroSectionProps) {
  return (
    <div
      className={clsx(
        "overflow-hidden bg-slate-800 dark:bg-transparent print:hidden",
        className,
      )}
    >
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-24 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            <div className="relative">
              <p className="inline text-4xl tracking-tight text-slate-200">
                Nextdoc
              </p>
              <p className="mt-3 text-2xl tracking-tight text-slate-400">
                Write your docs in markdown with Next.js
              </p>
              <div className="mt-8 flex gap-4 md:justify-center lg:justify-start">
                <Link
                  className="btn btn-primary rounded-full"
                  href="/docs/quick-start"
                >
                  Get started
                </Link>
                {/* External Link */}
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 size-[600px]">{/* Image */}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
