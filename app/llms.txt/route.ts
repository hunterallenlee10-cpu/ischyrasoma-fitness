import { business, fullAddress, isLive, siteUrl } from "@/lib/business";
import { classes } from "@/lib/classes";

export const dynamic = "force-static";

// Served in live mode only. Demo mode answers 404.
export function GET() {
  if (!isLive) return new Response("Not found", { status: 404 });
  const body = `# ${business.name}

> ${business.longName}. A Pilates and GYROTONIC® studio in ${business.address.city}, ${business.address.region}, serving ${business.serviceArea}. Every in-person group class holds ${business.classSize.inPerson} people.

- Address: ${fullAddress}
- Phone: ${business.phone.display}
- Email: ${business.email}
- Owner: ${business.owner.name}, ${business.owner.rolesInline}

## Book

- [Class schedule and booking](${siteUrl}/#schedule): this week's real class times, teachers, spots left and single-class prices
- [First Class Finder](${siteUrl}/#new-here): which class to start with
- [Free 15 minute consultation](${business.momence.consultation})
- [Memberships](${siteUrl}/#memberships)

## Classes

${classes.map((c) => `- [${c.name}](${siteUrl}/#${c.id}): ${c.length}, $${c.price} single class. ${c.description}`).join("\n")}
`;
  return new Response(body, { headers: { "content-type": "text/markdown; charset=utf-8" } });
}
