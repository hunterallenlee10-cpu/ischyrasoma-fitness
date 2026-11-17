import Image from "next/image";
import { classByKey, type ClassInfo } from "@/lib/classes";
import { SeeTimesButton } from "@/components/ui/SeeTimesButton";

function Meta({ c }: { c: ClassInfo }) {
  return (
    <p className="tnum text-[0.9375rem] text-muted">
      {c.length} <span aria-hidden="true">·</span> ${c.price} single class
    </p>
  );
}

/** Honest placeholder for a class with no photo of its own. Never another class's photo. */
function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  // TODO: swap for a real photo from the studio.
  return (
    <div
      className={`flex items-end rounded-[10px] border border-dashed border-teal/30 bg-mist/60 p-4 text-label font-medium text-muted ${className}`}
    >
      {label}
    </div>
  );
}

function Body({ c, titleSize = "text-h3" }: { c: ClassInfo; titleSize?: string }) {
  return (
    <>
      <h3 className={`${titleSize} font-medium`}>{c.name}</h3>
      <div className="mt-2">
        <Meta c={c} />
      </div>
      {c.levelNote && (
        <p className="mt-3 w-fit rounded-full bg-mist px-3 py-1 text-label font-semibold text-teal">{c.levelNote}</p>
      )}
      <p className="mt-3">{c.description}</p>
      {c.extraNote && <p className="mt-2 text-[0.9375rem] text-muted">{c.extraNote}</p>}
    </>
  );
}

function LargeCard({ c }: { c: ClassInfo }) {
  return (
    <article id={c.id} className="card reveal flex scroll-mt-24 flex-col overflow-hidden sm:flex-row lg:col-span-6">
      {c.photo && (
        <Image
          src={c.photo.src}
          alt={c.photo.alt}
          width={c.photo.width}
          height={c.photo.height}
          sizes="(min-width: 1024px) 240px, (min-width: 640px) 40vw, 100vw"
          className="aspect-[4/3] h-auto w-full object-cover sm:aspect-auto sm:h-auto sm:w-[36%] sm:self-stretch"
        />
      )}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <Body c={c} titleSize="text-h3 lg:text-[1.75rem]" />
        <div className="mt-auto pt-6">
          <SeeTimesButton cls={c.key} label={c.shortName} />
        </div>
      </div>
    </article>
  );
}

function SmallCard({
  c,
  span,
  horizontal = false,
  typeLed = false,
  aspect = "aspect-[3/2]",
}: {
  aspect?: string;
  c: ClassInfo;
  span: string;
  horizontal?: boolean;
  typeLed?: boolean;
}) {
  return (
    <article
      id={c.id}
      className={`card reveal flex scroll-mt-24 flex-col overflow-hidden ${horizontal ? "md:flex-row" : ""} ${span}`}
    >
      {typeLed ? null : c.photo ? (
        <Image
          src={c.photo.src}
          alt={c.photo.alt}
          width={c.photo.width}
          height={c.photo.height}
          style={c.photo.position ? { objectPosition: c.photo.position } : undefined}
          sizes={horizontal ? "(min-width: 1024px) 340px, (min-width: 768px) 45vw, 100vw" : "(min-width: 1024px) 380px, (min-width: 768px) 45vw, 100vw"}
          className={`h-auto w-full object-cover ${horizontal ? `${aspect} md:aspect-auto md:w-1/2 md:self-stretch` : aspect}`}
        />
      ) : c.placeholder ? (
        <div className={`p-3 pb-0 ${horizontal ? "md:w-1/2 md:pb-3" : ""}`}>
          <Placeholder label={c.placeholder} className="aspect-[3/2] h-full w-full" />
        </div>
      ) : null}
      <div className={`flex flex-1 flex-col p-6 ${typeLed ? "justify-center bg-mist/40 sm:p-8" : ""}`}>
        <Body c={c} titleSize={typeLed ? "text-h2" : "text-h3"} />
        <div className="mt-auto pt-6">
          <SeeTimesButton cls={c.key} label={c.shortName} />
        </div>
      </div>
    </article>
  );
}

/** Three type-led classes in one band: each is called out by name, with its own anchor. */
function SpecialtyBand({ list }: { list: ClassInfo[] }) {
  return (
    <div className="card reveal overflow-hidden lg:col-span-12">
      <p className="eyebrow border-b border-line px-6 py-4 text-teal">Also on the timetable</p>
      <div className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
        {list.map((c) => (
          <article key={c.key} id={c.id} className="flex scroll-mt-24 flex-col p-6">
            <Body c={c} />
            <div className="mt-auto pt-6">
              <SeeTimesButton cls={c.key} label={c.shortName} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ClassGuide() {
  const c = (k: string) => classByKey(k)!;
  return (
    <section id="class-guide" aria-labelledby="class-guide-heading" className="section border-t border-line">
      <div className="wrap">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow text-teal">Class guide</p>
            <h2 id="class-guide-heading" className="mt-3 text-h2">
              What each class is
            </h2>
          </div>
          <p className="measure text-muted lg:max-w-md lg:text-right">
            Every in-person class holds three people. The virtual mat class holds ten.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <LargeCard c={c("foundations")} />
          <LargeCard c={c("apparatus")} />
          <SmallCard c={c("tower")} span="lg:col-span-7" aspect="aspect-[3/2] lg:aspect-[2/1]" />
          <SmallCard c={c("mat")} span="lg:col-span-5" />
          <SmallCard c={c("gyrokinesis")} span="lg:col-span-4" />
          <SmallCard c={c("gyrotonic")} span="lg:col-span-4" />
          <SmallCard c={c("buff-bones")} span="lg:col-span-4" typeLed />
          <SpecialtyBand list={[c("men-only"), c("korean"), c("virtual")]} />
        </div>
      </div>
    </section>
  );
}
