// Matching rules for the First Class Finder (BUILD-SPEC.md section 4.3). 3 x 7 = 21 combinations.

export const experienceOptions = [
  { key: "never", label: "Never" },
  { key: "few", label: "A few classes" },
  { key: "regular", label: "Yes, regularly" },
] as const;

export const goalOptions = [
  { key: "equipment", label: "Learn the equipment properly" },
  { key: "mat", label: "Mat work, no equipment" },
  { key: "stretch", label: "Stretch and move more freely" },
  { key: "bones", label: "Bone health and balance" },
  { key: "men", label: "A men only class" },
  { key: "korean", label: "A class taught in Korean" },
  { key: "home", label: "A class from home" },
] as const;

export type Experience = (typeof experienceOptions)[number]["key"];
export type Goal = (typeof goalOptions)[number]["key"];

/** Returns the matched class key and an optional "also for you" class key. */
export function matchClass(experience: Experience, goal: Goal): { main: string; also?: string } {
  switch (goal) {
    case "equipment":
      return experience === "regular" ? { main: "apparatus", also: "tower" } : { main: "foundations" };
    case "mat":
      return { main: "mat" };
    case "stretch":
      return { main: "gyrokinesis", also: "gyrotonic" };
    case "bones":
      return { main: "buff-bones" };
    case "men":
      return { main: "men-only" };
    case "korean":
      return { main: "korean" };
    case "home":
      return { main: "virtual" };
  }
}
