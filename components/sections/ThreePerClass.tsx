import Image from "next/image";
import { Award, GraduationCap } from "lucide-react";
import { business, teachers } from "@/lib/business";
import { Avatar } from "@/components/ui/Avatar";

export function ThreePerClass() {
  return (
    <section aria-labelledby="three-heading" className="section border-t border-line bg-surface">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <div className="relative pb-10 lg:sticky lg:top-28">
          <Image
            src="/images/crop/02-eshael-on-spine-corrector.jpg"
            alt="Eshael M. Johnson on the spine corrector, one leg extended overhead, certificates on the wall behind her"
            width={852}
            height={1080}
            sizes="(min-width: 1024px) 460px, (min-width: 640px) 75vw, 88vw"
            className="reveal h-auto w-[88%] rounded-[14px] border border-line object-cover sm:w-[75%] lg:w-[80%]"
          />
          {/* DRAFT: confirm client permission for photo 09. */}
          <Image
            src="/images/crop/09-teacher-and-client-reformer-arms-up.jpg"
            alt="A teacher standing behind a seated client on the reformer, both with arms raised, mirror behind them"
            width={2380}
            height={3500}
            sizes="(min-width: 1024px) 200px, 38vw"
            className="reveal absolute bottom-0 right-0 h-auto w-[38%] rounded-[14px] border-4 border-surface object-cover sm:w-[34%]"
          />
          </div>
        </div>

        <div className="lg:col-span-6 lg:pt-6">
          <p className="eyebrow text-teal">Three per class</p>
          <h2 id="three-heading" className="mt-3 text-h2">
            Three people. One teacher. Nowhere to hide, and no one left behind.
          </h2>
          <p className="measure mt-6 text-lead">
            <span className="font-semibold">{business.owner.name}</span>, {business.owner.rolesInline}.
          </p>
          <p className="measure mt-3 text-muted">{business.owner.history}</p>
          <ul className="mt-6 space-y-3">
            <li className="flex gap-3">
              <Award aria-hidden="true" className="mt-1 size-5 shrink-0 text-teal" strokeWidth={1.75} />
              {/* DRAFT: confirm wording of the Best in Crofton line. */}
              <span>Named the {business.award}.</span>
            </li>
            <li className="flex gap-3">
              <GraduationCap aria-hidden="true" className="mt-1 size-5 shrink-0 text-teal" strokeWidth={1.75} />
              <span>{business.powerPilates}.</span>
            </li>
          </ul>

          <blockquote className="mt-10 border-l-2 border-teal pl-6">
            <p className="font-display text-[clamp(1.5rem,1.2rem+1.3vw,2.25rem)] leading-tight text-teal">
              {business.tagline}
            </p>
            <footer className="mt-2 text-label text-muted">Eshael M. Johnson, M.S.</footer>
          </blockquote>

          <h3 className="eyebrow mt-12 text-muted">The teachers</h3>
          <ul className="mt-4 grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-5 lg:grid-cols-5">
            {teachers.map((t) => (
              <li key={t.slug} className="flex flex-col items-center text-center">
                <Avatar src={t.photo} name={t.name} size={64} />
                <span className="mt-2 text-[0.875rem] font-medium leading-tight">{t.name}</span>
              </li>
            ))}
          </ul>

          {/* DRAFT: real Google reviews with names and dates go here. Empty on purpose: no names, no stars, no quote. */}
          <div className="mt-12 flex min-h-28 items-center justify-center rounded-[14px] border border-dashed border-line bg-ivory p-6 text-center">
            <p className="text-label font-semibold uppercase tracking-[0.14em] text-muted">Your Google reviews go here</p>
          </div>
        </div>
      </div>
    </section>
  );
}
