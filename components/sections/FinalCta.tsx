import { Phone } from "lucide-react";
import { business } from "@/lib/business";

export function FinalCta() {
  return (
    <section aria-labelledby="final-heading" className="section border-t border-line">
      <div className="wrap text-center">
        <h2 id="final-heading" className="mx-auto max-w-4xl text-display font-normal text-ink">
          {business.signOff}
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#schedule" className="btn btn-primary w-full sm:w-auto">
            See class times
          </a>
          <a href={business.phone.tel} className="btn btn-quiet w-full sm:w-auto">
            <Phone aria-hidden="true" className="size-4" strokeWidth={1.75} />
            Call <span className="tnum">{business.phone.display}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
