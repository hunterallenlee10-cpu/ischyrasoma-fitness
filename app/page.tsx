import { connection } from "next/server";
import { getSchedule } from "@/lib/schedule";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/sections/Footer";
import { ScheduleSection } from "@/components/Schedule/ScheduleSection";
import { NewHere } from "@/components/sections/NewHere";
import { ClassGuide } from "@/components/sections/ClassGuide";
import { MobileBar } from "@/components/sections/MobileBar";
import { ThreePerClass } from "@/components/sections/ThreePerClass";
import { Memberships } from "@/components/sections/Memberships";
import { Visit } from "@/components/sections/Visit";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { BackToTop } from "@/components/sections/BackToTop";
import { buildFaq } from "@/lib/faq";
import { buildJsonLd } from "@/lib/jsonld";

export default async function Home() {
  // Render per request so "Today" and the next class are always right. The feed fetch itself is cached for 15 minutes.
  await connection();
  const data = await getSchedule();
  const faq = buildFaq(data);
  const jsonLd = JSON.stringify(buildJsonLd(faq)).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero data={data} />
        <ScheduleSection data={data} />
        <NewHere data={data} />
        <ClassGuide />
        <ThreePerClass />
        <Memberships />
        <Visit />
        <Faq items={faq} />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
      <BackToTop />
    </>
  );
}
