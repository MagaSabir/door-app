import type { Metadata } from "next";
import { JsonLd, organizationLd, websiteLd } from "@/lib/json-ld";
import { pageMetadata, siteDescription } from "@/lib/site";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { PopularModels } from "@/components/popular-models";

export const metadata: Metadata = pageMetadata({ description: siteDescription, path: "/" });

export default function Home() {
  return (
    <main className="relative">
      <JsonLd data={[organizationLd(), websiteLd()]} />
      <Hero />
      <Features />
      <PopularModels />
    </main>
  );
}
