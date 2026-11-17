import Image from "next/image";

/** Teacher headshot. Sources are 500x500, shown at 96px or less. */
export function Avatar({
  src,
  name,
  size = 40,
  decorative = false,
  className = "",
}: {
  src: string | null;
  name: string;
  size?: number;
  decorative?: boolean;
  className?: string;
}) {
  if (!src) {
    const initials = name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2);
    return (
      <span
        aria-hidden="true"
        style={{ width: size, height: size }}
        className={`inline-flex shrink-0 items-center justify-center rounded-full bg-mist font-display text-teal ${className}`}
      >
        {initials}
      </span>
    );
  }
  return (
    <Image
      src={src}
      alt={decorative ? "" : `Headshot of ${name}`}
      width={500}
      height={500}
      sizes={`${size}px`}
      quality={75}
      style={{ width: size, height: size }}
      className={`shrink-0 rounded-full object-cover ring-1 ring-line ${className}`}
    />
  );
}
