import Image from "next/image";
import type { ScheduleData } from "@/lib/schedule";
import { business } from "@/lib/business";
import { lowestPrice } from "@/lib/classes";
import { NextClassCard } from "@/components/Hero/NextClassCard";
import { DayStrip } from "@/components/Hero/DayStrip";

export function Hero({ data }: { data: ScheduleData }) {
  const days = data.week.map((d) => ({
    key: d.key,
    weekdayShort: d.weekdayShort,
    weekdayLong: d.weekdayLong,
    dayNum: d.dayNum,
    count: d.sessions.length,
    isToday: d.isToday,
  }));
  const facts = [
    `${business.classSize.inPerson} people per class`,
    `Single classes from $${lowestPrice}`,
    // DRAFT: confirm wording of the Best in Crofton line.
    business.awardShort,
  ];

  return (
    <section id="top" aria-labelledby="page-title" className="pb-16 pt-5 sm:pt-10 lg:pb-24 lg:pt-14">
      <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-x-14 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <h1 id="page-title" className="font-display">
            <span className="eyebrow block text-teal">Pilates and GYROTONIC® classes in Gambrills, MD</span>
            <span className="mt-2 block text-h1 font-medium tracking-[-0.02em] text-ink sm:mt-4">
              This week&rsquo;s classes.
              <span className="block font-normal text-teal">Pick a time.</span>
            </span>
          </h1>
          <p className="measure mt-3 text-body text-muted sm:mt-5 sm:text-lead">
            Small classes at Ischyra Soma Fitness, never more than {business.classSize.inPerson} people in the room.
            Find a time, see who is teaching, and book your spot.
          </p>
          <div className="mt-4 sm:mt-8">
            <NextClassCard session={data.next} when={data.nextRelative} />
          </div>
          <div className="mt-5 sm:mt-6">
            <p className="sr-only">Or pick a day</p>
            <DayStrip days={days} />
          </div>
          <ul className="mt-8 grid gap-3 border-t border-line pt-6 text-[0.9375rem] sm:grid-cols-3 sm:gap-6">
            {facts.map((f, i) => (
              <li key={f} className={`flex items-baseline gap-3 ${i > 0 ? "sm:border-l sm:border-line sm:pl-6" : ""}`}>
                <span aria-hidden="true" className="font-display text-teal">
                  {["I", "II", "III"][i]}
                </span>
                <span className="font-medium leading-snug">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <figure className="relative hidden lg:col-span-5 lg:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] border border-line">
            <Image
              src="/images/raw/01-studio-room-wide-BEST.jpg"
              alt="The studio in Gambrills: reformers, a Cadillac and framed mirrors on a warm wood floor in daylight"
              width={1600}
              height={1200}
              sizes="(min-width: 1216px) 460px, 38vw"
              priority
              quality={75}
              className="absolute inset-0 h-full w-full object-cover object-[38%_50%]"
            />
          </div>
          <figcaption className="mt-3 text-label text-muted">
            The studio, {business.address.center}, {business.address.city}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
