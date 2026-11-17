// Class descriptions, prices and photos. Descriptions are her own words from her booking
// system and website (BUILD-SPEC.md section 1). Prices are single-class prices.

export type ClassType = "mat" | "apparatus" | "gyrotonic" | "gyrokinesis" | "virtual";

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** CSS object-position when the frame crops the photo. */
  position?: string;
  /** DRAFT notes for photos that need a release or a name. */
  draft?: string;
};

export type ClassInfo = {
  key: string;
  /** Stable anchor id, also used in the schedule URL hash as class=<key>. */
  id: string;
  name: string;
  /** Short name for buttons: "See times for Pilates Mat". */
  shortName: string;
  /** Names exactly as they arrive from the booking system (marks are often missing there). */
  dataNames: string[];
  types: ClassType[];
  length: string;
  price: number;
  description: string;
  levelNote?: string;
  extraNote?: string;
  photo?: Photo;
  /** Label for the honest placeholder when the class has no photo of its own. */
  placeholder?: string;
};

export const classes: ClassInfo[] = [
  {
    key: "foundations",
    id: "class-foundations",
    name: "Pilates Apparatus: Foundations",
    shortName: "Foundations",
    dataNames: ["Pilates Apparatus: Foundations"],
    types: ["apparatus"],
    length: "55 min",
    price: 45,
    description:
      "This class is designed as an introduction to Pilates including the terminology, the equipment and the Principles of Pilates. You will learn the fundamentals and proper technique.",
    levelNote: "Start here on equipment",
    photo: {
      src: "/images/crop/08-teacher-guiding-client-reformer.jpg",
      width: 1860,
      height: 2700,
      alt: "A teacher giving hands-on guidance to a client kneeling on the reformer in the studio",
      draft: "DRAFT: confirm client permission for photo 08",
    },
  },
  {
    key: "apparatus",
    id: "class-apparatus",
    name: "Pilates Apparatus",
    shortName: "Pilates Apparatus",
    dataNames: ["Pilates Apparatus"],
    types: ["apparatus"],
    length: "55 min",
    price: 45,
    description:
      "Continue to build a strong Pilates foundation and begin to add some complex exercises. May include exercises on the reformer, Wunda chair or mat.",
    photo: {
      src: "/images/crop/04-eshael-arc-reach-on-barrel.jpg",
      width: 705,
      height: 1080,
      alt: "Eshael Johnson in a long arched reach over the barrel, with mirrors and reformers behind her",
    },
  },
  {
    key: "tower",
    id: "class-tower",
    name: "Pilates Apparatus: Tower",
    shortName: "Tower",
    dataNames: ["Pilates Apparatus: Tower"],
    types: ["apparatus"],
    length: "55 min",
    price: 45,
    description:
      "Uses springs and straps. Eshael strongly recommends 5 to 10 classes, or Apparatus Foundations experience, or 3 private lessons first.",
    levelNote: "Best after 5 to 10 classes or 3 privates",
    photo: {
      src: "/images/raw/03-eshael-on-cadillac-tower.jpg",
      width: 1179,
      height: 776,
      alt: "Eshael Johnson lying on the Cadillac with her legs in the springs, in front of the stone accent wall",
      position: "50% 22%",
    },
  },
  {
    key: "mat",
    id: "class-mat",
    name: "Pilates Mat: Level I/II",
    shortName: "Pilates Mat",
    dataNames: ["Pilates Mat: Level I/II"],
    types: ["mat"],
    length: "45 or 55 min",
    price: 25,
    description:
      "Mat Pilates is a strengthening and lengthening form of exercise that focuses on your core (trunk) muscles while also training your arms and legs.",
    photo: {
      src: "/images/crop/07-mat-reverse-plank.jpg",
      width: 2762,
      height: 2163,
      alt: "A woman holding a reverse plank on a grey mat on the studio's wood floor",
      draft: "DRAFT: confirm who is pictured in photo 07",
    },
  },
  {
    key: "gyrotonic",
    id: "class-gyrotonic",
    name: "GYROTONIC® Tower Class",
    shortName: "GYROTONIC® Tower",
    dataNames: ["GYROTONIC® Tower Class", "GYROTONIC Tower Class"],
    types: ["gyrotonic"],
    length: "55 min",
    price: 45,
    description:
      "Works toward a healthier, more supple spine, increased range of motion, greater joint stability, and improved agility and athletic performance.",
    // Photo 06 (the pulley tower) was not in the Drive folder.
    placeholder: "Photo: GYROTONIC® Tower Class, from Ischyra Soma Fitness",
  },
  {
    key: "gyrokinesis",
    id: "class-gyrokinesis",
    name: "Stretch & Flex: GYROKINESIS®",
    shortName: "Stretch & Flex",
    dataNames: ["Stretch & Flex: GYROKINESIS", "Stretch & Flex: GYROKINESIS®"],
    types: ["gyrokinesis"],
    length: "30 or 55 min",
    price: 25,
    description: "Coordinates movement, breath and mental focus through rhythmic, flowing sequences.",
    photo: {
      src: "/images/crop/05-seated-gyrokinesis-stool.jpg",
      width: 942,
      height: 1455,
      alt: "A teacher seated on a GYROKINESIS® stool reaching one arm up, green mats on the floor",
    },
  },
  {
    key: "buff-bones",
    id: "class-buff-bones",
    name: "Buff Bones®",
    shortName: "Buff Bones®",
    dataNames: ["Buff Bones", "Buff Bones®"],
    // DRAFT: Buff Bones® sits under no type chip. Confirm whether she files it under Mat.
    types: [],
    length: "55 min",
    price: 45,
    description:
      "Low impact and bone health focused. Blends Pilates, yoga, strength training, balance work and functional movement.",
    extraNote:
      "For people concerned about bone health, with medical clearance where there is osteopenia or osteoporosis.",
    placeholder: "Photo: Buff Bones® class, from Ischyra Soma Fitness",
  },
  {
    key: "men-only",
    id: "class-men-only",
    name: "Pilates Apparatus: Men Only",
    shortName: "Men Only",
    dataNames: ["Pilates Apparatus: Men Only"],
    types: ["apparatus"],
    length: "55 min",
    price: 45,
    description: "Pilates Apparatus, for men only.",
    placeholder: "Photo: Men Only class, from Ischyra Soma Fitness",
  },
  {
    key: "korean",
    id: "class-korean",
    name: "Pilates Apparatus: Korean Language",
    shortName: "Korean Language",
    dataNames: ["Pilates Apparatus: Korean Language"],
    types: ["apparatus"],
    length: "55 min",
    price: 45,
    description: "Pilates Apparatus, taught in Korean.",
    placeholder: "Photo: Korean Language class, from Ischyra Soma Fitness",
  },
  {
    key: "virtual",
    id: "class-virtual",
    name: "Virtual Pilates Mat",
    shortName: "Virtual Mat",
    dataNames: ["Virtual Pilates Mat"],
    types: ["mat", "virtual"],
    length: "45 min",
    price: 25,
    description: "Pilates Mat on Zoom. All levels welcome.",
    placeholder: "Photo: Virtual Pilates Mat class, from Ischyra Soma Fitness",
  },
];

export const typeFilters: { key: "all" | ClassType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "mat", label: "Mat" },
  { key: "apparatus", label: "Apparatus" },
  { key: "gyrotonic", label: "GYROTONIC®" },
  { key: "gyrokinesis", label: "GYROKINESIS®" },
  { key: "virtual", label: "Virtual" },
];

function norm(s: string) {
  return s.toLowerCase().replace(/[®™]/g, "").replace(/\s+/g, " ").trim();
}

export function classForDataName(name: string): ClassInfo | undefined {
  const n = norm(name);
  return classes.find((c) => c.dataNames.some((d) => norm(d) === n));
}

export function classByKey(key: string): ClassInfo | undefined {
  return classes.find((c) => c.key === key);
}

export const lowestPrice = Math.min(...classes.map((c) => c.price));
