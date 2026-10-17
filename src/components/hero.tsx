import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#1c1b19] text-white lg:rounded-b-[28px]">
      <Image
        src="/images/hero.webp"
        alt="Интерьер прихожей с тёмной межкомнатной дверью"
        fill
        preload
        sizes="100vw"
        className="-z-10 object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

      <div className="mx-auto flex min-h-[370px] max-w-[1440px] flex-col justify-center px-6 py-12 lg:min-h-[860px] lg:px-28 lg:pt-40">
        <h1 className="max-w-[16ch] text-[28px] font-semibold leading-[1.2] tracking-tight sm:text-4xl lg:max-w-none lg:text-[72px] lg:leading-[1.1]">
          Межкомнатные двери
          <br className="hidden lg:block" /> для современного интерьера
        </h1>
        <p className="mt-4 text-lg text-white/90 lg:mt-8 lg:text-3xl">Стиль. Качество. Комфорт.</p>
        <Link
          href="/catalog"
          className="group mt-7 inline-flex w-fit items-center gap-4 rounded-xl bg-sand px-9 py-4 text-lg text-ink shadow-lg transition hover:bg-sand-dark lg:mt-14 lg:px-14 lg:py-7 lg:text-2xl"
        >
          Перейти к каталогу
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1 lg:size-7" />
        </Link>
      </div>
    </section>
  );
}
