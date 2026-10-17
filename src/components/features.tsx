import { BadgeCheck, DoorOpen, Ruler, Truck } from "lucide-react";

const features = [
  { icon: DoorOpen, title: "Более 1000 моделей", text: "в наличии" },
  { icon: BadgeCheck, title: "Гарантия", text: "до 5 лет" },
  { icon: Ruler, title: "Бесплатный замер", text: "и консультация", desktopOnly: true },
  { icon: Truck, title: "Доставка", text: "по всей России" },
];

export function Features() {
  return (
    <section className="border-b border-line bg-white">
      <ul className="mx-auto grid max-w-[1440px] grid-cols-3 px-4 py-6 lg:grid-cols-4 lg:px-28 lg:py-12">
        {features.map(({ icon: Icon, title, text, desktopOnly }, i) => (
          <li
            key={title}
            className={`flex-col gap-3 px-2 lg:flex-row lg:items-center lg:gap-5 lg:px-6 xl:px-8 ${
              desktopOnly ? "hidden lg:flex" : "flex"
            } ${i > 0 ? "border-l border-line" : "lg:pl-0"}`}
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface lg:size-16">
              <Icon className="size-5 stroke-[1.5] lg:size-7" />
            </span>
            <p className="text-sm leading-snug text-ink lg:whitespace-nowrap lg:text-base xl:text-lg">
              {title}
              <br />
              {text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
