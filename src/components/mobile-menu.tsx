"use client";

import Link from "next/link";
import { useRef } from "react";
import NavList, { NavGroup } from "./nav-list";

export interface MobileMenuProps {
  navs?: NavGroup[];
  children?: React.ReactNode;
}

export default function MobileMenu({ navs }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        className="relative"
        aria-label="Open navigation"
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-6 w-6 stroke-slate-500"
        >
          <path d="M4 7h16M4 12h16M4 17h16"></path>
        </svg>
      </button>
      <dialog ref={dialogRef} className="modal">
        <div
          className="fixed inset-0 flex items-start overflow-y-auto bg-base-100/50 pr-10 backdrop-blur"
          onClick={() => {
            dialogRef.current?.close();
          }}
        >
          <div
            className="min-h-full w-full max-w-xs bg-base-100 px-4 pb-12 pt-5 sm:px-6"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex items-center gap-4">
              <button
                className="btn btn-circle btn-ghost btn-sm border-none outline-none"
                aria-label="Close navigation"
                onClick={() => {
                  dialogRef.current?.close();
                }}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="size-4 stroke-slate-500"
                >
                  <path d="M5 5l14 14M19 5l-14 14"></path>
                </svg>
              </button>
              <Link href="/" className="relative">
                {/* Logo */}
              </Link>
            </div>
            <NavList className="mt-5 overflow-y-auto" items={navs} />
          </div>
        </div>
      </dialog>
    </>
  );
}
