import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Page not found | Ischyra Soma Fitness",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="wrap flex min-h-dvh flex-col items-center justify-center py-20 text-center">
      <Image
        src="/images/raw/00-logo-3-swan-mark-black.png"
        alt=""
        width={169}
        height={169}
        sizes="96px"
        className="h-auto w-24 opacity-80"
      />
      <p className="eyebrow mt-6 text-teal">404</p>
      <h1 className="mt-3 text-h1">This page has moved on.</h1>
      <p className="measure mt-4 text-lead text-muted">The class times are all on one page now.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/#schedule" className="btn btn-primary">
          See class times
        </Link>
        <a href={business.phone.tel} className="btn btn-quiet">
          Call {business.phone.display}
        </a>
      </div>
    </main>
  );
}
