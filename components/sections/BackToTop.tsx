"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Appears only after the visitor has scrolled one and a half screens. Tablet and desktop only:
 *  on phones the same control sits inside the bottom bar, so it never floats over content. */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 1.5);
    requestAnimationFrame(on);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <a
      href="#top"
      aria-label="Back to top"
      inert={!show}
      className={`fixed bottom-6 right-6 z-30 hidden size-12 items-center justify-center rounded-full border border-line bg-surface text-teal shadow-bar transition-[opacity,transform] duration-200 hover:border-teal motion-reduce:transition-none md:inline-flex ${
        show ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp aria-hidden="true" className="size-5" strokeWidth={1.75} />
    </a>
  );
}
