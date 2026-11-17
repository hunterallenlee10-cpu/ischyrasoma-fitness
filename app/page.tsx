import { connection } from "next/server";
import { getSchedule } from "@/lib/schedule";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/sections/Footer";
import { MobileBar } from "@/components/sections/MobileBar";

export default async function Home() {
  // Render per request so "Today" and the next class are always right. The feed fetch itself is cached for 15 minutes.
  await connection();
  const data = await getSchedule();

  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero data={data} />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
