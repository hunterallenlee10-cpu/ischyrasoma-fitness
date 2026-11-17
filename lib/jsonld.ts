// Structured data. Only true things: no ratings, no reviews, no invented class events.
import { business, hours, siteUrl } from "@/lib/business";
import { classes } from "@/lib/classes";
import type { FaqItem } from "@/lib/faq";

const studioId = `${siteUrl}/#studio`;

export function buildJsonLd(faq: FaqItem[]) {
  const studio = {
    "@type": "ExerciseGym",
    "@id": studioId,
    name: business.name,
    alternateName: business.longName,
    url: `${siteUrl}/`,
    telephone: business.phone.e164,
    email: business.email,
    logo: `${siteUrl}/images/raw/00-logo-swan-logo-colour-transparent.png`,
    image: [`${siteUrl}/images/raw/01-studio-room-wide-BEST.jpg`, `${siteUrl}/images/raw/10-studio-entrance-door.jpg`],
    slogan: business.tagline,
    priceRange: "$25 to $45 per single class",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.address.street}, ${business.address.suite}`,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.latitude, longitude: business.geo.longitude },
    // DRAFT: confirm hours.
    openingHoursSpecification: hours.flatMap((h) =>
      h.slots.map((s) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${h.schemaDay}`,
        opens: s.opens,
        closes: s.closes,
      })),
    ),
    areaServed: [
      { "@type": "City", name: "Crofton, MD" },
      { "@type": "City", name: "Gambrills, MD" },
      { "@type": "AdministrativeArea", name: "Anne Arundel County, MD" },
    ],
    sameAs: [business.social.facebook, business.social.instagram, business.social.linkedin],
  };

  const services = classes.map((c) => ({
    "@type": "Service",
    "@id": `${siteUrl}/#${c.id}`,
    name: c.name,
    serviceType: c.types.includes("virtual") ? "Online Pilates class" : "Group fitness class",
    description: [c.description, c.extraNote].filter(Boolean).join(" "),
    provider: { "@id": studioId },
    areaServed: { "@type": "AdministrativeArea", name: "Anne Arundel County, MD" },
    offers: {
      "@type": "Offer",
      name: "Single class",
      price: c.price,
      priceCurrency: "USD",
      url: `${siteUrl}/#schedule`,
    },
  }));

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return { "@context": "https://schema.org", "@graph": [studio, ...services, faqPage] };
}
