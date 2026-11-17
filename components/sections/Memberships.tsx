import { ArrowUpRight, Gift, MessageCircle } from "lucide-react";
import { business, memberships, membershipFromPrices, showMembershipPrices } from "@/lib/business";

const terms = [3, 6, 12] as const;

export function Memberships() {
  return (
    <section id="memberships" aria-labelledby="memberships-heading" className="on-deep section bg-deep text-ivory">
      <div className="wrap">
        <div className="max-w-3xl">
          <p className="eyebrow text-mist">Memberships and privates</p>
          <h2 id="memberships-heading" className="mt-3 text-h2 text-ivory">
            Ready to come every week?
          </h2>
          <p className="measure mt-4 text-lead text-mist">Memberships are billed once at the start of your chosen term.</p>
        </div>

        <table className="mt-12 block w-full border-collapse text-left md:table">
          <caption className="sr-only">Membership programs and terms. Prices are shown at checkout.</caption>
          <thead className="hidden md:table-header-group">
            <tr className="border-b border-ivory/25">
              <th scope="col" className="w-[40%] py-4 pr-6 text-label font-semibold uppercase tracking-[0.14em] text-mist">
                Program
              </th>
              {terms.map((t) => (
                <th key={t} scope="col" className="px-2 py-4 text-label font-semibold uppercase tracking-[0.14em] text-mist">
                  {t} months
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {memberships.map((m) => (
              <tr key={m.key} className="block border-b border-ivory/25 py-6 md:table-row md:py-0">
                <th scope="row" className="block pb-4 pr-6 align-top font-normal md:table-cell md:py-7">
                  <span className="block font-display text-h3 text-ivory">{m.name}</span>
                  {/* DRAFT: her own one-line description shows here once supplied. */}
                  {m.description && <span className="mt-1 block text-[0.9375rem] text-mist">{m.description}</span>}
                </th>
                {m.links.map((l) => {
                  const from = showMembershipPrices ? membershipFromPrices[m.key]?.[l.months] : undefined;
                  return (
                    <td key={l.months} className="block py-1 md:table-cell md:px-2 md:py-7 md:align-top">
                      <a
                        href={l.href}
                        className="group inline-flex min-h-11 w-full items-center justify-between gap-3 whitespace-nowrap rounded-full border border-ivory/30 px-4 py-2 text-[0.9375rem] text-ivory transition-colors hover:border-ivory hover:bg-ivory/10 md:w-auto md:justify-start"
                      >
                        <span>
                          Choose {l.months} months
                          <span className="sr-only"> of {m.name}</span>
                          {l.bestValue && <span className="ml-2 text-mist md:sr-only">Best Value</span>}
                          {from !== undefined && <span className="ml-2 text-mist">from ${from}</span>}
                        </span>
                        <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
                      </a>
                      {l.bestValue && (
                        <span aria-hidden="true" className="mt-2 hidden pl-4 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-mist md:block">
                          Best Value
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-8">
          <a href={business.momence.giftCard} className="inline-flex min-h-11 items-center gap-2 text-ivory underline decoration-ivory/40 underline-offset-4 hover:decoration-ivory">
            <Gift aria-hidden="true" className="size-4" strokeWidth={1.75} />
            Send a gift card
          </a>
          <a href={business.momence.consultation} className="inline-flex min-h-11 items-center gap-2 text-ivory underline decoration-ivory/40 underline-offset-4 hover:decoration-ivory">
            <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.75} />
            Book a free 15 minute consultation
          </a>
        </div>
      </div>
    </section>
  );
}
