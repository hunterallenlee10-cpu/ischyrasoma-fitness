"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { business } from "@/lib/business";

/** Full-screen sheet on phones and tablets. A native dialog gives focus trapping and Escape. */
export function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-teal"
      >
        <Menu aria-hidden="true" className="size-5" strokeWidth={1.75} />
        <span className="sr-only">Open the menu</span>
      </button>
      <dialog
        id="mobile-menu"
        ref={ref}
        onClose={() => setOpen(false)}
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ivory p-0 text-ink backdrop:bg-ink/30"
      >
        <div className="wrap flex h-16 items-center justify-between">
          <p className="font-display text-h3">Ischyra Soma Fitness</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line"
          >
            <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
            <span className="sr-only">Close the menu</span>
          </button>
        </div>
        <nav aria-label="Sections, mobile" className="wrap pt-6">
          <ul className="divide-y divide-line border-y border-line">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-16 items-center font-display text-h2 transition-colors hover:text-teal"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={business.phone.tel} className="btn btn-quiet mt-8 w-full text-lead">
            <Phone aria-hidden="true" className="size-5" strokeWidth={1.75} />
            Call {business.phone.display}
          </a>
          <a href="#schedule" onClick={() => setOpen(false)} className="btn btn-primary mt-3 w-full">
            See class times
          </a>
        </nav>
      </dialog>
    </div>
  );
}
