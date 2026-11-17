import Image from "next/image";
import { Phone } from "lucide-react";
import { business } from "@/lib/business";
import { MobileMenu } from "@/components/sections/MobileMenu";

export const navLinks = [
  { href: "#schedule", label: "Schedule" },
  { href: "#new-here", label: "New here" },
  { href: "#class-guide", label: "Class guide" },
  { href: "#memberships", label: "Memberships" },
  { href: "#visit", label: "Visit" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur-sm supports-[backdrop-filter]:bg-ivory/85">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2"
      >
        Skip to main content
      </a>
      <div className="wrap flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <a href="#top" className="shrink-0 rounded-md" aria-label="Ischyra Soma Fitness, back to the top">
          <Image
            src="/images/raw/00-logo-2-script-wordmark-dark.png"
            alt=""
            width={315}
            height={145}
            sizes="(min-width: 1024px) 124px, 104px"
            priority
            className="h-auto w-[104px] lg:w-[124px]"
          />
        </a>
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3 py-2 text-[0.9375rem] font-medium text-ink/85 transition-colors hover:bg-surface hover:text-teal"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={business.phone.tel}
            className="hidden items-center gap-2 rounded-full px-3 py-2 font-semibold text-teal transition-colors hover:bg-surface sm:inline-flex"
          >
            <Phone aria-hidden="true" className="size-4" strokeWidth={1.75} />
            <span className="tnum">{business.phone.display}</span>
            <span className="sr-only">, call Ischyra Soma Fitness</span>
          </a>
          <a href="#schedule" className="btn btn-quiet hidden min-h-11 border-teal/50 px-5 lg:inline-flex">
            See class times
          </a>
          <MobileMenu links={navLinks} />
        </div>
      </div>
    </header>
  );
}
