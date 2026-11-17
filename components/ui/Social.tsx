import { business } from "@/lib/business";

const icons = {
  facebook: (
    <path d="M14 8.5V6.8c0-.8.5-1.3 1.4-1.3H17V2.6c-.5-.1-1.5-.2-2.6-.2C12 2.4 10.6 3.9 10.6 6.4v2.1H8v3.1h2.6v8.9H14v-8.9h2.7l.4-3.1H14Z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.4" cy="6.6" r="1.1" />
    </>
  ),
  linkedin: (
    <path d="M4.5 9h3v10.5h-3V9Zm1.5-5a1.75 1.75 0 1 1 0 3.5A1.75 1.75 0 0 1 6 4Zm4 5h2.9v1.45h.04c.4-.76 1.38-1.55 2.84-1.55 3.04 0 3.6 2 3.6 4.6v5.99h-3v-5.31c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81v5.4H10V9Z" />
  ),
};

const labels = {
  facebook: "Ischyra Soma Fitness on Facebook",
  instagram: "Ischyra Soma Fitness on Instagram",
  linkedin: "Ischyra Soma Fitness on LinkedIn",
};

export function Social({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex gap-2 ${className}`}>
      {(Object.keys(icons) as (keyof typeof icons)[]).map((k) => (
        <li key={k}>
          <a
            href={business.social[k]}
            aria-label={labels[k]}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-teal transition-colors hover:border-teal hover:bg-surface"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              {icons[k]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
