/** "2 of 3 spots left" with one dot per place in the room. The dots prove the class size. */
export function Spots({ remaining, capacity, className = "" }: { remaining: number; capacity: number; className?: string }) {
  if (remaining <= 0) {
    return <p className={`font-semibold text-error ${className}`}>Full, join the waitlist</p>;
  }
  const showDots = capacity > 0 && capacity <= 4;
  return (
    <p className={`inline-flex items-center gap-2 font-semibold text-moss ${className}`}>
      {showDots && (
        <span className="inline-flex gap-1" aria-hidden="true">
          {Array.from({ length: capacity }, (_, i) => (
            <span
              key={i}
              className={`size-2 rounded-full ${i < capacity - remaining ? "bg-line" : "bg-moss"}`}
            />
          ))}
        </span>
      )}
      <span>
        {remaining} of {capacity} {capacity === 1 ? "spot" : "spots"} left
      </span>
    </p>
  );
}
