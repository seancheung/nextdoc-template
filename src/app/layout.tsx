import clsx from "clsx";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nextdoc",
  description: "Write your docs in markdown with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full antialiased" lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className, "flex min-h-full bg-base-100")}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
