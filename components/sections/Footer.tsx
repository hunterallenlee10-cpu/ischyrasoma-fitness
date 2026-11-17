import Image from "next/image";
import { business, fullAddress, hours, isLive } from "@/lib/business";
import { classes } from "@/lib/classes";
import { Social } from "@/components/ui/Social";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface pb-28 pt-16 md:pb-12 lg:pt-20">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Image
            src="/images/raw/00-logo-swan-logo-colour-transparent.png"
            alt="Ischyra Soma Fitness swan and feather logo"
            width={794}
            height={804}
            sizes="132px"
            className="h-auto w-[132px]"
          />
          <p className="mt-5 font-display text-h3">{business.tagline}</p>
          <a href={business.phone.tel} className="tnum mt-6 block font-display text-h2 text-teal hover:text-teal-hover">
            {business.phone.display}
            <span className="sr-only">, call Ischyra Soma Fitness</span>
          </a>
          <a href={`mailto:${business.email}`} className="link mt-2 inline-block">
            {business.email}
          </a>
          <Social className="mt-6" />
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
          <div>
            <h2 className="eyebrow text-muted">Find us</h2>
            <address className="mt-3 not-italic leading-relaxed">
              {business.name}
              <br />
              {business.address.center}
              <br />
              {business.address.street}, {business.address.suite}
              <br />
              {business.address.city}, {business.address.region} {business.address.postalCode}
            </address>
            <span className="sr-only">{fullAddress}</span>
          </div>
          <div>
            <h2 className="eyebrow text-muted">Studio hours</h2>
            {/* DRAFT: confirm hours. */}
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[0.9375rem]">
              {hours.map((h) => (
                <div key={h.day} className="contents">
                  <dt className="text-muted">{h.day.slice(0, 3)}</dt>
                  <dd>{h.slots.map((s) => s.label).join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="eyebrow text-muted">Classes</h2>
            <ul className="mt-3 space-y-1.5 text-[0.9375rem]">
              {classes.map((c) => (
                <li key={c.key}>
                  <a href={`#${c.id}`} className="hover:text-teal hover:underline">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="wrap mt-14 flex flex-col gap-2 border-t border-line pt-6 text-label text-muted sm:flex-row sm:justify-between">
        <p>© 2026 Ischyra Soma Fitness</p>
        {!isLive && <p>Concept preview by Lee Enterprises Unlimited.</p>}
      </div>
    </footer>
  );
}
