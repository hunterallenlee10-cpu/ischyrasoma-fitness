"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { business, textEnabled } from "@/lib/business";

/**
 * Phone-only sticky bar: [Call] [See class times], plus [Text] when textEnabled.
 * It never covers the focused element: on focus, anything hidden behind it is scrolled clear.
 */
export function MobileBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [canText, setCanText] = useState(false);
  // Hidden while the hero's own "Book this class" is on screen, so it never covers it.
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    // A text link does nothing on a desktop computer, so it only shows on touch devices.
    setCanText(textEnabled && window.matchMedia("(pointer: coarse)").matches);
    const onFocus = (e: FocusEvent) => {
      const bar = ref.current;
      const el = e.target as HTMLElement | null;
      if (!bar || !el || bar.contains(el) || getComputedStyle(bar).visibility === "hidden") return;
      const barTop = bar.getBoundingClientRect().top;
      const r = el.getBoundingClientRect();
      if (r.bottom > barTop - 8) window.scrollBy({ top: r.bottom - barTop + 24, behavior: "auto" });
    };
    document.addEventListener("focusin", onFocus);
    const target = document.getElementById("next-class-book");
    let io: IntersectionObserver | undefined;
    if (target) {
      io = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), { rootMargin: "0px 0px -88px 0px" });
      io.observe(target);
    } else setHeroVisible(false);
    return () => {
      document.removeEventListener("focusin", onFocus);
      io?.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      inert={heroVisible}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] shadow-bar backdrop-blur-sm transition-[transform,visibility] duration-300 motion-reduce:transition-none md:hidden ${
        heroVisible ? "invisible translate-y-full" : "visible translate-y-0"
      }`}
    >
      <div className="flex gap-2 px-4 py-2.5">
        <a href={business.phone.tel} className="btn btn-quiet min-h-12 flex-1 px-3">
          <Phone aria-hidden="true" className="size-4" strokeWidth={1.75} />
          Call<span className="sr-only"> {business.phone.display}</span>
        </a>
        {textEnabled &&
          (canText ? (
            <a
              href={`${business.phone.sms}?&body=${encodeURIComponent(business.phone.smsBody)}`}
              className="btn btn-quiet min-h-12 flex-1 px-3"
            >
              <MessageSquare aria-hidden="true" className="size-4" strokeWidth={1.75} />
              Text<span className="sr-only"> {business.phone.display}</span>
            </a>
          ) : (
            <a href={`mailto:${business.email}`} className="btn btn-quiet min-h-12 flex-1 px-3">
              <Mail aria-hidden="true" className="size-4" strokeWidth={1.75} />
              Email<span className="sr-only"> {business.email}</span>
            </a>
          ))}
        <a href="#schedule" className="btn btn-primary min-h-12 flex-[1.6] px-3">
          See class times
        </a>
      </div>
    </div>
  );
}
