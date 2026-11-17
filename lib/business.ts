// Every business fact on the page lives here. Sources: her own website and her own
// Momence booking account, read on 17 November 2026 (BUILD-SPEC.md section 1).
// Nothing here may be invented. Anything assumed carries a DRAFT comment.

export const siteMode: "demo" | "live" =
  process.env.NEXT_PUBLIC_SITE_MODE === "live" ? "live" : "demo";
export const isLive = siteMode === "live";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** What "Book this class" does. 'session' links to the Momence session, 'membership' scrolls to the memberships band. */
// DRAFT: confirm which mode she wants (single classes bookable from this page, or membership first).
export const bookingMode: "session" | "membership" = "session";

/** Text link to the studio phone. Off until she confirms the number takes texts. */
// DRAFT: confirm texting on 703.528.2821.
export const textEnabled = false;

/** Membership prices are not published. Flip on and fill `membershipFromPrices` when she supplies numbers. */
export const showMembershipPrices = false;

export const business = {
  name: "Ischyra Soma Fitness",
  longName: "Ischyra Soma Fitness Pilates & GYROTONIC® Wellness Center",
  shortName: "ISF",
  owner: {
    name: "Eshael M. Johnson, M.S.",
    firstName: "Eshael",
    roles: "Classically trained Pilates instructor, GYROTONIC® teacher and GYROKINESIS® trainer",
    rolesInline: "classically trained Pilates instructor, GYROTONIC® teacher and GYROKINESIS® trainer",
    history: "She started Pilates in 2009, began her comprehensive certification in 2017 and added the GYROTONIC® method in 2021. She also holds a Buff Bones® certification.",
  },
  address: {
    center: "Princess Crofton Shopping Center",
    street: "1166 State Route 3 S",
    suite: "Suite 105",
    city: "Gambrills",
    region: "MD",
    postalCode: "21054",
    country: "US",
  },
  geo: { latitude: 39.0155, longitude: -76.6957 },
  serviceArea: "Crofton, Gambrills and surrounding Anne Arundel County communities",
  phone: {
    display: "703.528.2821",
    tel: "tel:+17035282821",
    sms: "sms:+17035282821",
    e164: "+17035282821",
    smsBody: "Hi, I would like to book a class at Ischyra Soma Fitness.",
  },
  email: "info@ischyrasomafitness.co",
  social: {
    facebook: "https://www.facebook.com/IschyraSomaFitness",
    instagram: "https://www.instagram.com/ischyra_soma_fitness",
    linkedin: "https://www.linkedin.com/company/ischyra-soma-fitness",
  },
  momence: {
    hostId: 37215,
    iosApp: "https://apps.apple.com/us/app/momence/id1577856009",
    androidApp: "https://play.google.com/store/apps/details?id=com.ribbon.mobileApp",
    consultation: "https://momence.com/appointments/appointment-reservation/37215",
    giftCard: "https://momence.com/Ischyra-Soma-Fitness-Pilates-%26-GYROTONIC-Wellness-Center/gift-card-checkout/37215",
  },
  tagline: "Better living through strength and grace™",
  signOff: "Yours in strength and grace™",
  // DRAFT: confirm wording of the Best in Crofton line.
  award: "Best Pilates Studio in Crofton, Maryland for the fourth year in a row (Best in Crofton 2025)",
  awardShort: "Best Pilates Studio in Crofton, 4 years running",
  powerPilates: "Official Host Training Center for Power Pilates",
  newcomerAdvice: "Eshael recommends an Introductory Private Lesson as the best starting point.",
  classSize: { inPerson: 3, virtual: 10 },
} as const;

export const fullAddress = `${business.address.center}, ${business.address.street}, ${business.address.suite}, ${business.address.city}, ${business.address.region} ${business.address.postalCode}`;

export const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent(`${business.name}, ${business.address.street}, ${business.address.suite}, ${business.address.city}, ${business.address.region} ${business.address.postalCode}`);

/** Studio hours from her site's own data. DRAFT: confirm hours (some class times fall outside them). */
export const hours: { day: string; schemaDay: string; slots: { opens: string; closes: string; label: string }[] }[] = [
  { day: "Monday", schemaDay: "Monday", slots: [{ opens: "16:00", closes: "21:00", label: "4 to 9 PM" }] },
  { day: "Tuesday", schemaDay: "Tuesday", slots: [{ opens: "17:00", closes: "21:00", label: "5 to 9 PM" }] },
  { day: "Wednesday", schemaDay: "Wednesday", slots: [{ opens: "17:00", closes: "21:00", label: "5 to 9 PM" }] },
  {
    day: "Thursday",
    schemaDay: "Thursday",
    slots: [
      { opens: "10:00", closes: "12:00", label: "10 AM to 12 PM" },
      { opens: "17:00", closes: "21:00", label: "5 to 9 PM" },
    ],
  },
  { day: "Friday", schemaDay: "Friday", slots: [{ opens: "18:00", closes: "21:00", label: "6 to 9 PM" }] },
  { day: "Saturday", schemaDay: "Saturday", slots: [{ opens: "07:00", closes: "14:00", label: "7 AM to 2 PM" }] },
  { day: "Sunday", schemaDay: "Sunday", slots: [{ opens: "08:00", closes: "14:00", label: "8 AM to 2 PM" }] },
];

export type Membership = {
  key: string;
  name: string;
  // DRAFT: her own one-line description for each program goes here. Left empty rather than invented.
  description: string;
  links: { months: 3 | 6 | 12; href: string; bestValue?: boolean }[];
};

export const memberships: Membership[] = [
  {
    key: "owner-privates",
    name: "Private Lessons with Studio Owner",
    description: "",
    links: [
      { months: 3, href: "https://momence.com/m/683912" },
      { months: 6, href: "https://momence.com/m/683914" },
      // She labels this one Best Value.
      { months: 12, href: "https://momence.com/m/683916", bestValue: true },
    ],
  },
  {
    key: "teacher-privates",
    name: "Private Lessons with Certified Teacher",
    description: "",
    links: [
      { months: 3, href: "https://momence.com/m/685358" },
      { months: 6, href: "https://momence.com/m/685362" },
      { months: 12, href: "https://momence.com/m/685363" },
    ],
  },
  {
    key: "mat-gyrokinesis",
    name: "Mat & GYROKINESIS® Classes",
    description: "",
    links: [
      { months: 3, href: "https://momence.com/m/685384" },
      { months: 6, href: "https://momence.com/m/685385" },
      { months: 12, href: "https://momence.com/m/685386" },
    ],
  },
  {
    key: "apparatus-gyrotonic",
    name: "Apparatus & GYROTONIC® Classes",
    description: "",
    links: [
      { months: 3, href: "https://momence.com/m/685387" },
      { months: 6, href: "https://momence.com/m/685389" },
      { months: 12, href: "https://momence.com/m/685390" },
    ],
  },
];

/** Switched off. Fill when she supplies prices and set showMembershipPrices to true. */
export const membershipFromPrices: Partial<Record<string, Partial<Record<3 | 6 | 12, number>>>> = {};

export type Teacher = { name: string; slug: string; photo: string };

export const teachers: Teacher[] = [
  { name: "Eshael Johnson", slug: "eshael-johnson", photo: "/images/raw/11-teacher-eshael-johnson.jpg" },
  { name: "Rena McNeill", slug: "rena-mcneill", photo: "/images/raw/12-teacher-rena-mcneill.jpg" },
  { name: "Karen Fleming", slug: "karen-fleming", photo: "/images/raw/13-teacher-karen-fleming.jpg" },
  { name: "Claudette Ojo", slug: "claudette-ojo", photo: "/images/raw/14-teacher-claudette-ojo.jpg" },
  { name: "April Kankonde", slug: "april-kankonde", photo: "/images/raw/15-teacher-april-kankonde.jpg" },
  { name: "Abigail Shin", slug: "abigail-shin", photo: "/images/raw/16-teacher-abigail-shin.jpg" },
  { name: "Minson Kim", slug: "minson-kim", photo: "/images/raw/17-teacher-minson-kim.jpg" },
  { name: "Monique Bocock", slug: "monique-bocock", photo: "/images/raw/18-teacher-monique-bocock.jpg" },
  { name: "Jouella Fabe", slug: "jouella-fabe", photo: "/images/raw/19-teacher-jouella-fabe.jpg" },
];

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[®™]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function teacherBySlugOrName(nameOrSlug: string): Teacher | undefined {
  const s = slugify(nameOrSlug);
  return teachers.find((t) => t.slug === s);
}
