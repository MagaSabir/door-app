"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Lightbox } from "./lightbox";

export function Gallery({ name, images }: { name: string; images: string[] }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const many = images.length > 1;
  const go = (d: number) => setIndex((i) => (i + d + images.length) % images.length);


  return (
    <div className="flex gap-3 lg:justify-center lg:gap-4">
      {many && (
        <ul className="flex w-14 shrink-0 flex-col gap-2 lg:w-[72px] lg:gap-3">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Фото ${i + 1}`}
                aria-current={i === index}
                className={`relative block aspect-[4/5] w-full overflow-hidden rounded-lg transition ${
                  i === index ? "ring-2 ring-ink" : "opacity-70 ring-1 ring-line hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="72px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="group relative min-w-0 flex-1 lg:max-w-[520px]">
        <button
          type="button"
          onClick={() => setZoom(true)}
          className="relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-surface"
          aria-label="Увеличить фото"
        >
          <Image
            src={images[index]}
            alt={`Межкомнатная дверь ${name}`}
            fill
            preload
            sizes="(min-width: 1024px) 520px, 80vw"
            className="object-cover"
          />
          <span className="absolute bottom-3 right-3 hidden items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs text-ink opacity-0 shadow-sm transition group-hover:opacity-100 lg:flex">
            <Expand className="size-3.5" />
            Увеличить
          </span>
        </button>
        {many && (
          <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between lg:hidden">
            <ArrowButton dir="prev" onClick={() => go(-1)} />
            <ArrowButton dir="next" onClick={() => go(1)} />
          </div>
        )}
      </div>

      {zoom && (
        <Lightbox images={images} index={index} name={name} onIndex={setIndex} onClose={() => setZoom(false)} />
      )}
    </div>
  );
}

function ArrowButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Предыдущее фото" : "Следующее фото"}
      className="pointer-events-auto grid size-10 place-items-center rounded-full bg-white/90 text-ink shadow-sm"
    >
      <Icon className="size-5" />
    </button>
  );
}
