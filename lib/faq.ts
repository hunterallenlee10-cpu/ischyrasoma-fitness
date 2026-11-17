// FAQ answered only from BUILD-SPEC.md section 1 and the schedule data. The same plain text feeds the
// visible accordion and the FAQPage JSON-LD, so the two always match word for word.
import { business, directionsUrl, fullAddress } from "@/lib/business";
import type { ScheduleData, Session } from "@/lib/schedule";

export type FaqItem = { q: string; a: string; link?: { href: string; label: string } };

function nextOf(data: ScheduleData, key: string): Session | undefined {
  return data.all.find((s) => s.classKey === key);
}

function nextLine(s: Session | undefined, name: string, extra: string) {
  if (!s) return `${name} ${extra}. No upcoming times right now.`;
  return `${name} ${extra}, next on ${s.weekdayLong} ${s.dateLabel.split(" ").slice(1).join(" ")} at ${s.timeLabel.replace(/ /g, " ")} with ${s.teacher}.`;
}

export function buildFaq(data: ScheduleData): FaqItem[] {
  return [
    {
      q: "Do I need experience?",
      a: `No. Start with Pilates Apparatus: Foundations or a Pilates Mat class, or with an Introductory Private Lesson, which ${business.owner.firstName} recommends as the best starting point.`,
      link: { href: business.momence.consultation, label: "Book a free 15 minute consultation" },
    },
    {
      q: "How many people are in a class?",
      a: `${business.classSize.inPerson} in every in-person group class. The Virtual Pilates Mat class on Zoom holds ${business.classSize.virtual}.`,
    },
    {
      q: "What does a single class cost?",
      a: "$25 for Pilates Mat, Stretch & Flex: GYROKINESIS® and Virtual Pilates Mat classes. $45 for Pilates Apparatus, GYROTONIC® Tower and Buff Bones® classes. Membership prices are shown at checkout.",
    },
    {
      q: "Which class should I book first?",
      a: "Answer the two questions in the First Class Finder and it shows your class with its next real times.",
      link: { href: "#new-here", label: "Open the First Class Finder" },
    },
    {
      q: "Is there a class in Korean, or for men only?",
      a: `Yes. ${nextLine(nextOf(data, "korean"), "Pilates Apparatus: Korean Language", "is taught in Korean")} ${nextLine(
        nextOf(data, "men-only"),
        "Pilates Apparatus: Men Only",
        "is for men only",
      )}`,
    },
    {
      q: "Where are you?",
      a: `${fullAddress}. Serving ${business.serviceArea}.`,
      link: { href: directionsUrl, label: "Get directions to Ischyra Soma Fitness" },
    },
  ];
}
