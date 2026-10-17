import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { MobileTabBar } from "@/components/mobile-tab-bar";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "ДвериГрад — межкомнатные двери для современного интерьера",
    template: "%s — ДвериГрад",
  },
  description:
    "Более 1000 моделей межкомнатных дверей в наличии. Гарантия до 5 лет, бесплатный замер и доставка по всей России.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col pb-[calc(64px+env(safe-area-inset-bottom))] lg:pb-0">
        <Header />
        {children}
        <Footer />
        <MobileTabBar />
      </body>
    </html>
  );
}
