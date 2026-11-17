import { Plus } from "lucide-react";
import type { FaqItem } from "@/lib/faq";

/** Native details and summary: keyboard and screen reader support with no script. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section aria-labelledby="faq-heading" className="section border-t border-line bg-surface">
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-teal">Questions</p>
          <h2 id="faq-heading" className="mt-3 text-h2">
            Before your first class
          </h2>
        </div>
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {items.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-h3 [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus
                  aria-hidden="true"
                  className="size-5 shrink-0 text-teal transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                  strokeWidth={1.75}
                />
              </summary>
              <div className="measure pb-6 pr-10">
                <p>{f.a}</p>
                {f.link && (
                  <a href={f.link.href} className="link mt-3 inline-block">
                    {f.link.label}
                  </a>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
