import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Handshake, Ruler, Truck } from "lucide-react";
import { FeatureGrid, InfoPage, PageHeader, SectionTitle, Steps } from "@/components/info/blocks";

export const metadata: Metadata = {
  title: "О компании",
  description: "ДвериГрад — межкомнатные двери для современного интерьера: более 1000 моделей, гарантия до 5 лет.",
};

const stats = [
  { value: "1000+", label: "моделей в наличии" },
  { value: "до 5 лет", label: "гарантия на двери" },
  { value: "0 ₽", label: "замер и консультация" },
  { value: "РФ", label: "доставка по всей России" },
];

const values = [
  { icon: BadgeCheck, title: "Проверенные фабрики", text: "Работаем напрямую с производителями и проверяем каждую партию перед отправкой." },
  { icon: Ruler, title: "Точный замер", text: "Замерщик приезжает бесплатно, помогает выбрать модель и рассчитывает комплектацию." },
  { icon: Truck, title: "Доставка до двери", text: "Привозим в удобное время, поднимаем на этаж и забираем упаковку." },
  { icon: Handshake, title: "Честная цена", text: "Фиксируем стоимость в договоре — без скрытых доплат после монтажа." },
];

const steps = [
  { title: "Заявка", text: "Оставьте заявку на сайте или позвоните — подберём модели под ваш интерьер." },
  { title: "Замер", text: "Бесплатно приедем, замерим проёмы и уточним комплектацию." },
  { title: "Договор", text: "Фиксируем цену и сроки, оплата — после подтверждения заказа." },
  { title: "Доставка и монтаж", text: "Привезём и установим двери, уберём мусор после работы." },
];

export default function AboutPage() {
  return (
    <InfoPage>
      <PageHeader
        title="О компании"
        lead="ДвериГрад — межкомнатные двери для современного интерьера. Помогаем выбрать, привозим и устанавливаем под ключ."
      />

      <section className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-surface">
          <Image src="/images/hero.webp" alt="Интерьер с межкомнатной дверью" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <p className="text-[16px] leading-relaxed text-ink/80 lg:text-lg">
            Мы собрали каталог дверей, которые хорошо выглядят в реальных квартирах: от лаконичного модерна до
            классики и скандинавского стиля. Каждую модель можно заказать в нескольких цветах и размерах, а
            наши специалисты помогут подобрать фурнитуру и доборы.
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-surface p-4 lg:p-5">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-2xl font-semibold lg:text-3xl">{s.value}</span>
                  <span className="mt-1 block text-sm text-ink-muted">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mt-14 lg:mt-20">
        <SectionTitle>Почему выбирают нас</SectionTitle>
        <div className="mt-5 lg:mt-8">
          <FeatureGrid items={values} cols={4} />
        </div>
      </section>

      <section className="mt-14 lg:mt-20">
        <SectionTitle>Как мы работаем</SectionTitle>
        <div className="mt-5 lg:mt-8">
          <Steps items={steps} />
        </div>
      </section>

      <section className="mt-14 flex flex-col items-start justify-between gap-5 rounded-3xl bg-ink p-6 text-white lg:mt-20 lg:flex-row lg:items-center lg:p-10">
        <div>
          <h2 className="text-xl font-semibold lg:text-2xl">Готовы подобрать двери?</h2>
          <p className="mt-1.5 text-white/70">Посмотрите каталог или закажите бесплатный замер.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/catalog" className="inline-flex items-center gap-2 rounded-xl bg-sand px-6 py-3.5 text-ink hover:bg-sand-dark">
            Каталог <ArrowRight className="size-4" />
          </Link>
          <Link href="/installation#measure" className="rounded-xl border border-white/30 px-6 py-3.5 hover:bg-white/10">
            Заказать замер
          </Link>
        </div>
      </section>
    </InfoPage>
  );
}
