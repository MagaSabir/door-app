import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import Image from "next/image";
import { Check, Hammer, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { Faq, FeatureGrid, InfoPage, PageHeader, SectionTitle, Steps } from "@/components/info/blocks";
import { CallbackForm } from "@/components/info/callback-form";

export const metadata: Metadata = pageMetadata({
  title: "Установка межкомнатных дверей под ключ",
  description:
    "Бесплатный замер и профессиональная установка межкомнатных дверей: коробка, наличники, доборы, врезка фурнитуры. Гарантия на монтаж.",
  path: "/installation",
});

const steps = [
  { title: "Бесплатный замер", text: "Мастер приезжает в удобное время, замеряет проёмы и помогает с выбором." },
  { title: "Расчёт", text: "Подбираем коробку, наличники и доборы. Стоимость фиксируем до начала работ." },
  { title: "Монтаж", text: "Устанавливаем коробку и полотно, врезаем фурнитуру, регулируем зазоры." },
  { title: "Приёмка", text: "Проверяем работу двери вместе с вами и убираем мусор после себя." },
];

const included = [
  "Сборка и установка дверной коробки",
  "Навес полотна и регулировка",
  "Врезка замка, ручки и петель",
  "Монтаж наличников и доборов",
  "Запенивание и герметизация швов",
  "Уборка и вывоз упаковки",
];

const benefits = [
  { icon: Wrench, title: "Опытные мастера", text: "Штатные монтажники, которые знают особенности каждой модели из каталога." },
  { icon: ShieldCheck, title: "Гарантия на монтаж", text: "Если дверь начнёт заедать или провиснет — приедем и отрегулируем бесплатно." },
  { icon: Sparkles, title: "Чистая работа", text: "Используем пылесос при резке и защищаем пол и стены во время работ." },
];

const faq = [
  { q: "Сколько стоит установка?", a: "Стоимость зависит от типа проёма, количества дверей и комплектации. Точную сумму мастер назовёт на замере — она фиксируется в договоре." },
  { q: "Сколько времени занимает монтаж одной двери?", a: "Обычно 2–3 часа на дверь при подготовленном проёме. Если нужно расширять проём или ставить доборы — дольше." },
  { q: "Нужно ли готовить проём?", a: "Проём должен быть очищен от старой коробки и мусора. Демонтаж старой двери мы можем выполнить сами — скажите об этом на замере." },
  { q: "Можно ли установить двери, купленные не у вас?", a: "Да, при наличии полной комплектации. Условия гарантии в этом случае обсуждаются отдельно." },
];

export default function InstallationPage() {
  return (
    <InfoPage>
      <PageHeader path="/installation"
        title="Установка дверей"
        lead="Замерим проёмы бесплатно, подберём комплектацию и установим двери под ключ — аккуратно и в срок."
      />

      <section className="mt-8 lg:mt-12">
        <Steps items={steps} />
      </section>

      <section className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
        <div>
          <SectionTitle>Что входит в монтаж</SectionTitle>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:mt-8">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px]">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ink text-white">
                  <Check className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-center gap-2 text-[15px] text-ink-muted">
            <Hammer className="size-4" />
            Все модели поставляются с телескопической коробкой в комплекте.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface">
          <Image
            src="/images/doors/classic-oak.webp"
            alt="Установленная межкомнатная дверь"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[50%_40%]"
          />
        </div>
      </section>

      <section className="mt-14 lg:mt-20">
        <SectionTitle>Почему стоит доверить монтаж нам</SectionTitle>
        <div className="mt-5 lg:mt-8">
          <FeatureGrid items={benefits} />
        </div>
      </section>

      <section id="measure" className="mt-14 grid scroll-mt-28 gap-8 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14">
        <div>
          <SectionTitle>Вопросы об установке</SectionTitle>
          <div className="mt-5 lg:mt-8">
            <Faq items={faq} />
          </div>
        </div>
        <CallbackForm
          topic="measure"
          title="Бесплатный замер"
          text="Оставьте заявку — согласуем удобное время приезда мастера."
          submitLabel="Заказать замер"
          withComment
        />
      </section>
    </InfoPage>
  );
}
