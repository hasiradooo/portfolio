'use client'

import { SolidLogo, OutlineArrowLeft } from "@/icons/Icons";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { useLanguage } from "@/app/providers/language-provider";
import { SolidLogoGecko } from "@/icons/assets/logo/logo_gecko";
import { SolidLogoTextGecko } from "@/icons/assets/logo/logo_text_gecko";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/personal", label: "Personal" },
  { href: "/projects", label: "Projects" },
  { href: "/prices", label: "Prices" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const { dict } = useLanguage();

  const NavLinks = ({ onClick, className }: { onClick?: () => void, className?: string }) => (
    <>
      {navigationLinks.map((link) => {
        const isActive = link.href === "/"
          ? pathname === "/" || pathname === ""
          : pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClick}
            className={cn(
              "text-xs font-mono transition-colors uppercase tracking-wider relative group focus-visible:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-ring",
              isActive
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-600 dark:text-gray-400 md:hover:text-gray-900 md:dark:hover:text-gray-100",
              className
            )}
          >
            {dict.common.nav[link.label.toLowerCase() as keyof typeof dict.common.nav] ?? link.label}
            <span
              className={cn(
                "absolute -bottom-1 left-0 w-full h-0.5 bg-foreground transform origin-left transition-transform duration-200",
                isActive ? "scale-x-100" : "scale-x-0 md:group-hover:scale-x-100"
              )}
            />
          </Link>
        );
      })}
    </>
  );

  const HeaderContent = () => {
    // Check if we're on a project detail page
    const isProjectDetailPage = pathname.startsWith('/projects/') && pathname !== '/projects';

    return (
      <div className="border-b border-border bg-background/90 backdrop-blur-md">
        <div className="max-w-screen-md mx-auto sm:border-l sm:border-r border-border">
          <div className="flex justify-between items-center py-3 px-6">
            <div className="flex items-center gap-3">
              {isProjectDetailPage ? (
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-xs font-mono text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors uppercase tracking-wider group focus-visible:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-ring"
                >
                  <OutlineArrowLeft
                    size={12}
                    className="rotate-0 group-hover:-rotate-45 transition-transform group-focus-visible:-rotate-45"
                  />
                  {dict.common.nav.backToProjects}
                </Link>
              ) : (
                <>
                  {/* <Link
                    href="#"
                    onClick={() => skipNavigation(true)}
                    className={cn(
                      "text-xs font-mono transition-colors uppercase tracking-wider relative group focus-visible:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-ring",
                      "absolute left-4 top-1/2 -translate-y-1/2 opacity-0 focus-visible:translate-y-0 focus-visible:opacity-100 transition-all duration-200"
                    )}
                  >
                    {dict.common.nav.skipNavigation}
                  </Link> */}
                  <Link
                    href={'/'}
                    className={cn(
                      "flex items-center gap-3 transition-all duration-200",
                    )}
                  >
                    <SolidLogoTextGecko size={40} />
                    {/* <div className="size-10 sm:size-8 bg-foreground text-background flex items-center justify-center">
                      <SolidLogo size={20} />
                    </div> */}
                    {/* <span className="font-mono font-bold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wider">
                      {dict.common.siteName}
                    </span> */}
                  </Link>
                </>
              )}
            </div>

            {isMobile ? (
              <MobileNav items={navigationLinks.map(n => ({ ...n, label: dict.common.nav[n.label.toLowerCase() as keyof typeof dict.common.nav] ?? n.label }))} className="flex lg:hidden" />
            ) : (
              <nav className="flex h-6 items-center gap-4" tabIndex={-1}>
                <NavLinks />
              </nav>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-40">
      <HeaderContent />
    </header>
  );
}
