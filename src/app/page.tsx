import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { PopularModels } from "@/components/popular-models";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Features />
      <PopularModels />
    </main>
  );
}
