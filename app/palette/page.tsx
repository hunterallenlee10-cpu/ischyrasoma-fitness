// Phase 1 palette board. Temporary, removed before Phase 2 ships.
import Image from "next/image";

const swatches = [
  ["Ivory", "bg-ivory", "#F7F3EC"],
  ["Surface", "bg-surface", "#FFFDF9"],
  ["Line", "bg-line", "#DDD5C7"],
  ["Ink", "bg-ink", "#142F2E"],
  ["Muted", "bg-muted", "#4F6462"],
  ["Teal", "bg-teal", "#03696B"],
  ["Teal hover", "bg-teal-hover", "#024F51"],
  ["Deep", "bg-deep", "#0B3B3C"],
  ["Mist", "bg-mist", "#DCEBE6"],
  ["Saddle", "bg-saddle", "#A8481F"],
  ["Moss", "bg-moss", "#2F6B2A"],
  ["Error", "bg-error", "#A3312B"],
];

export default function Palette() {
  return (
    <main className="wrap section">
      <p className="eyebrow text-teal">Palette board</p>
      <h1 className="text-h1 mt-2">Strength and Grace</h1>
      <div className="mt-8 grid grid-cols-3 gap-3 md:grid-cols-6">
        {swatches.map(([n, c, h]) => (
          <div key={n} className="card overflow-hidden">
            <div className={`${c} h-20 border-b border-line`} />
            <p className="p-3 text-label">
              <span className="font-semibold">{n}</span>
              <br />
              {h}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="card p-6">
          <p className="eyebrow text-saddle">Next class</p>
          <p className="font-display text-h2 tnum mt-2">Today, 6:00 PM</p>
          <p className="text-h3 font-display mt-1">Pilates Apparatus: Foundations</p>
          <p className="text-moss font-semibold mt-3">1 of 3 spots left</p>
          <a className="btn btn-primary mt-5 w-full" href="#">Book this class</a>
          <p className="text-h2 font-display mt-6">The full schedule</p>
          <p className="text-lead text-muted measure mt-3">
            Small classes at Ischyra Soma Fitness, never more than 3 people in the room. Find a time, see who is
            teaching, and book your spot.
          </p>
          <p className="mt-4 measure">
            Mat Pilates is a strengthening and lengthening form of exercise that focuses on your core (trunk) muscles
            while also training your arms and legs. <a className="link" href="#">Book a free 15 minute consultation</a>
          </p>
          <div className="mt-6 rounded-[14px] bg-deep p-6 text-ivory">
            <p className="font-display text-h3">Ready to come every week?</p>
            <p className="text-mist mt-2">Memberships are billed once at the start of your chosen term.</p>
          </div>
        </div>
        <Image
          src="/images/raw/01-studio-room-wide-BEST.jpg"
          alt="The studio with reformers, a Cadillac and framed mirrors on a wood floor"
          width={1600}
          height={1200}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="rounded-[14px] h-full object-cover"
        />
      </div>
    </main>
  );
}
