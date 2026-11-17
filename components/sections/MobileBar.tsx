"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUp, Mail, MessageSquare, Phone } from "lucide-react";
import { business, textEnabled } from "@/lib/business";

/**
 * Phone-only sticky bar: [Call] [See class times], plus [Text] when textEnabled.
 * It never covers the focused element: on focus, anything hidden behind it is scrolled clear.
 */
export function MobileBar() {
  const ref = useRef<HTMLDivElement>(null);
  // A text link does nothing on a desktop computer, so it only shows on touch devices.
  const coarse = useSyncExternalStore(
    () => () => {},
    () => window.matchMedia("(pointer: coarse)").matches,
    () => false,
  );
  const canText = textEnabled && coarse;
  // Hidden while the hero's own "Book this class" is on screen, so it never covers it.
  const [heroVisible, setHeroVisible] = useState(true);
  const [deep, setDeep] = useState(false);

  useEffect(() => {
    const onFocus = (e: FocusEvent) => {
      // Wait for the browser's own scroll-into-view, then clear the bar if it still covers the element.
      requestAnimationFrame(() => clear(e));
    };
    const clear = (e: FocusEvent) => {
      const bar = ref.current;
      const focused = e.target as HTMLElement | null;
      if (!bar || !focused || bar.contains(focused) || getComputedStyle(bar).visibility === "hidden") return;
      // Keyboard focus only. A tap can focus a large container such as <main>, which must never move the page.
      if (!focused.matches(":focus-visible")) return;
      // Visually hidden inputs (the finder's radios) are measured by their visible label.
      const el = focused.getBoundingClientRect().width <= 1 ? (focused.closest("label") ?? focused) : focused;
      const barTop = bar.getBoundingClientRect().top;
      const r = el.getBoundingClientRect();
      // Only act when the element really sits behind the bar, never on a far-off measurement.
      if (r.height < window.innerHeight / 2 && r.bottom > barTop - 8 && r.top < window.innerHeight) {
        window.scrollBy({ top: r.bottom - barTop + 24, behavior: "auto" });
      }
    };
    document.addEventListener("focusin", onFocus);
    const onScroll = () => setDeep(window.scrollY > window.innerHeight * 1.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    const target = document.getElementById("next-class-book");
    let io: IntersectionObserver | undefined;
    if (target) {
      io = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), { rootMargin: "0px 0px -88px 0px" });
      io.observe(target);
    } else requestAnimationFrame(() => setHeroVisible(false));
    return () => {
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("scroll", onScroll);
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
        {deep && (
          <a
            href="#top"
            aria-label="Back to top"
            className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-line text-teal"
          >
            <ArrowUp aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </a>
        )}
      </div>
    </div>
  );
}
