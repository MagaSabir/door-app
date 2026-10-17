import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroVideo } from "./hero-video";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#1c1b19] text-white lg:rounded-b-[28px]">
      {/*
        Media layer. Mobile: covers the block. Desktop: a 16:9 box as tall as the block,
        pinned right — the whole frame (door + baseboard) stays visible, and its left
        edge fades into the dark background behind the text.
      */}
      <div className="absolute inset-0 -z-10 lg:left-auto lg:aspect-video lg:h-full lg:[mask-image:linear-gradient(to_right,transparent,#000_25%)]">
        {/* First video frame: shows instantly, and stays for reduced-motion users */}
        <Image
          src="/images/hero-poster.webp"
          alt="Интерьер прихожей с тёмной межкомнатной дверью"
          fill
          preload
          sizes="(min-width: 1024px) 90vw, 100vw"
          className="object-cover object-[75%_center] lg:object-center"
        />
        <HeroVideo
          sources={[
            { src: "/videos/hero.webm", type: 'video/webm; codecs="vp9"' },
            { src: "/videos/hero.mp4", type: "video/mp4" },
          ]}
          poster="/images/hero-poster.webp"
          className="absolute inset-0 size-full object-cover object-[75%_center] lg:object-center"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

      <div className="mx-auto flex min-h-[340px] max-w-[1440px] flex-col justify-center px-5 py-10 sm:px-6 sm:py-12 lg:h-[clamp(480px,min(calc(100svh-105px),56.25vw),860px)] lg:min-h-0 lg:px-10 lg:pb-10 lg:pt-28 xl:px-16">
        <h1 className="max-w-[16ch] text-[24px] font-semibold leading-[1.2] tracking-tight sm:text-4xl lg:max-w-none lg:text-[40px] lg:leading-[1.15] xl:text-[52px] 2xl:text-[56px]">
          Межкомнатные двери
          <br className="hidden lg:block" /> для современного интерьера
        </h1>
        <p className="mt-3 text-base text-white/90 sm:mt-4 sm:text-lg lg:mt-5 lg:text-xl xl:mt-6 xl:text-2xl">Стиль. Качество. Комфорт.</p>
        <Link
          href="/catalog"
          className="group mt-6 inline-flex w-fit items-center gap-3 rounded-xl bg-sand px-6 py-3 text-[15px] text-ink shadow-lg transition hover:bg-sand-dark sm:mt-7 sm:gap-4 sm:px-9 sm:py-4 sm:text-lg lg:mt-9 lg:px-9 lg:py-4 lg:text-lg xl:mt-10 xl:px-10 xl:py-[18px] xl:text-xl"
        >
          Перейти к каталогу
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 sm:size-5 xl:size-6" />
        </Link>
      </div>
    </section>
  );
}
