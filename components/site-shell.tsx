"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";
import { FloatingControls } from "./floating-controls";

/** The personal scrapbook has its own navigation and full-width canvas. */
export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/story" || pathname.startsWith("/story/")) {
    return <main className="flex-1 w-full">{children}</main>;
  }
  return (
    <>
      <Header />
      <main className="flex flex-col flex-1">
        <div className="h-full flex-1 max-w-screen-md mx-auto w-full sm:border-l sm:border-r border-border bg-background [&>section:not(#hero)]:pt-6 [&>section:is(:last-child)]:pb-6">
          {children}
        </div>
      </main>
      <Footer />
      <FloatingControls />
    </>
  );
}
