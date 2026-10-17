import type { Metadata } from "next";
import { Banknote, Building2, CreditCard, FileText, MapPin, Package, Store, Truck } from "lucide-react";
import { Faq, FeatureGrid, InfoPage, PageHeader, SectionTitle } from "@/components/info/blocks";
import { CallbackForm } from "@/components/info/callback-form";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Доставка и оплата",
  description: "Доставка межкомнатных дверей по городу и по всей России, самовывоз, способы оплаты.",
};

// TODO: уточнить реальные условия и сроки доставки
const delivery = [
  { icon: Truck, title: "По городу", text: "Привезём в согласованный день и интервал, поднимем на этаж. Стоимость рассчитает менеджер при оформлении." },
  { icon: Package, title: "По всей России", text: "Отправляем транспортными компаниями в жёсткой упаковке. Срок и цена зависят от региона." },
  { icon: Store, title: "Самовывоз", text: `Заберите заказ сами — ${company.showroom.toLowerCase()}. Подготовим двери к выдаче и поможем с погрузкой.` },
];

const payment = [
  { icon: Banknote, title: "Наличными", text: "Курьеру или в шоуруме после проверки заказа." },
  { icon: CreditCard, title: "Картой", text: "Оплата картой или по QR-коду через СБП." },
  { icon: Building2, title: "Для юрлиц", text: "Безналичный расчёт по счёту с НДС, закрывающие документы." },
  { icon: FileText, title: "По договору", text: "Фиксируем стоимость и сроки — без доплат после установки." },
];

const faq = [
  { q: "Когда нужно платить?", a: "Оплата производится после замера и подтверждения заказа. Предоплата и условия фиксируются в договоре." },
  { q: "Можно ли проверить двери при получении?", a: "Да. Курьер дождётся, пока вы осмотрите полотна и комплектующие. Если что-то повреждено — заменим за наш счёт." },
  { q: "Поднимаете ли вы двери на этаж?", a: "Да, подъём на этаж выполняем при доставке по городу. Стоимость зависит от этажа и наличия лифта — уточните у менеджера." },
  { q: "Как доставляете в другие города?", a: "Через транспортные компании. Упаковываем каждое полотно в гофрокартон с уголками, по желанию — в обрешётку." },
];

export default function DeliveryPage() {
  return (
    <InfoPage>
      <PageHeader
        title="Доставка и оплата"
        lead="Привозим двери по городу и отправляем по всей России. Оплата — после замера и подтверждения заказа."
      />

      <section className="mt-8 lg:mt-12">
        <SectionTitle>Способы доставки</SectionTitle>
        <div className="mt-5 lg:mt-8">
          <FeatureGrid items={delivery} />
        </div>
      </section>

      <section className="mt-14 lg:mt-20">
        <SectionTitle>Оплата</SectionTitle>
        <div className="mt-5 lg:mt-8">
          <FeatureGrid items={payment} cols={4} />
        </div>
      </section>

      <section className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14">
        <div>
          <SectionTitle>Частые вопросы</SectionTitle>
          <div className="mt-5 lg:mt-8">
            <Faq items={faq} />
          </div>
          <p className="mt-6 flex items-start gap-2 text-[15px] text-ink-muted">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            {company.address}. {company.hours}.
          </p>
        </div>
        <CallbackForm topic="callback" title="Рассчитать доставку" text="Оставьте номер — менеджер перезвонит и посчитает стоимость для вашего адреса." submitLabel="Перезвоните мне" />
      </section>
    </InfoPage>
  );
}
