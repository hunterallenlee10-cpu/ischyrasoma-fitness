import Image from "next/image";
import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import { business, directionsUrl, hours } from "@/lib/business";

export function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-heading" className="section border-t border-line">
      <div className="wrap">
        <p className="eyebrow text-teal">Visit</p>
        <h2 id="visit-heading" className="mt-3 text-h2">
          Find the studio
        </h2>
        <p className="measure mt-4 text-lead text-muted">
          In the {business.address.center} in {business.address.city}, serving {business.serviceArea}.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-12 lg:gap-10">
          <Image
            src="/images/raw/10-studio-entrance-door.jpg"
            alt="The studio's entrance door with a glass panel, reformers and the Cadillac visible inside"
            width={1200}
            height={1600}
            sizes="(min-width: 1024px) 280px, (min-width: 768px) 38vw, 100vw"
            className="reveal aspect-[4/5] h-auto w-full rounded-[14px] border border-line object-cover md:col-span-5 lg:col-span-3 md:aspect-auto md:h-full"
          />

          <div className="card p-6 sm:p-8 md:col-span-7 lg:col-span-5">
            <h3 className="flex items-center gap-2 font-display text-h3">
              <MapPin aria-hidden="true" className="size-5 text-teal" strokeWidth={1.75} />
              {business.name}
            </h3>
            <address className="mt-3 not-italic leading-relaxed">
              {business.address.center}
              <br />
              {business.address.street}, {business.address.suite}
              <br />
              {business.address.city}, {business.address.region} {business.address.postalCode}
            </address>
            <a href={directionsUrl} className="btn btn-quiet mt-5">
              <Navigation aria-hidden="true" className="size-4" strokeWidth={1.75} />
              Get directions to Ischyra Soma Fitness
            </a>

            <ul className="mt-7 space-y-2 border-t border-line pt-6">
              <li>
                <a href={business.phone.tel} className="inline-flex min-h-11 items-center gap-3 font-semibold text-teal hover:text-teal-hover">
                  <Phone aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  <span className="tnum">{business.phone.display}</span>
                  <span className="sr-only">, call the studio</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="inline-flex min-h-11 items-center gap-3 font-semibold text-teal hover:text-teal-hover">
                  <Mail aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  {business.email}
                </a>
              </li>
            </ul>

            {/* DRAFT: confirm hours. Some class times (Tue 7:30 AM, Sat 3 PM, Sun 10 and 11 AM) sit outside them. */}
            <table className="mt-6 w-full border-t border-line pt-6 text-[0.9375rem]">
              <caption className="pb-2 pt-6 text-left eyebrow text-muted">Studio hours</caption>
              <tbody>
                {hours.map((h) => (
                  <tr key={h.day} className="border-b border-line/70 last:border-b-0">
                    <th scope="row" className="py-2 pr-4 text-left font-medium">
                      {h.day}
                    </th>
                    <td className="tnum py-2 text-right text-muted">{h.slots.map((s) => s.label).join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-label text-muted">Class times are in the schedule above, in Eastern Time.</p>
          </div>

          <Image
            src="/images/raw/01-studio-room-wide-BEST.jpg"
            alt="Inside the studio: reformers, a Wunda chair and a Cadillac on a wood floor under framed mirrors"
            width={1600}
            height={1200}
            sizes="380px"
            className="reveal hidden h-full w-full rounded-[14px] border border-line object-cover lg:col-span-4 lg:block"
          />
        </div>
      </div>
    </section>
  );
}
