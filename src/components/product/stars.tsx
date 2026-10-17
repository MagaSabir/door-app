import { Star } from "lucide-react";

export function Stars({ value, className = "size-4 lg:size-6" }: { value: number; className?: string }) {
  return (
    <span className="flex gap-0.5" aria-label={`Рейтинг ${value} из 5`} role="img">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${className} ${i <= Math.round(value) ? "fill-[#f08a24] text-[#f08a24]" : "fill-line text-line"}`}
        />
      ))}
    </span>
  );
}
