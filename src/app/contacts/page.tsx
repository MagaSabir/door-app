import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { InfoPage, PageHeader } from "@/components/info/blocks";
import { CallbackForm } from "@/components/info/callback-form";
import { company, managerUrl, phone } from "@/lib/data";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Телефон ${phone.display}. ${company.address}. ${company.hours}.`,
};

const contacts = [
  { icon: Phone, label: "Телефон", value: phone.display, href: phone.href },
  { icon: Send, label: "Telegram", value: "Написать менеджеру", href: managerUrl, external: true },
  { icon: Mail, label: "Почта", value: company.email, href: `mailto:${company.email}` },
  { icon: MapPin, label: "Адрес", value: `${company.address}. ${company.showroom}` },
  { icon: Clock, label: "Режим работы", value: company.hours },
];

export default function ContactsPage() {
  return (
    <InfoPage>
      <PageHeader title="Контакты" lead="Звоните, пишите или приезжайте в шоурум — покажем двери вживую и поможем с выбором." />

      <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14">
        <section aria-label="Контактная информация">
          <ul className="divide-y divide-line border-y border-line">
            {contacts.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label} className="flex items-center gap-4 py-4 lg:py-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface">
                  <Icon className="size-5 stroke-[1.5]" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-ink-muted">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="break-words text-[17px] font-medium hover:underline lg:text-lg"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-[17px] lg:text-lg">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-muted">{company.legal}</p>
        </section>

        <CallbackForm topic="callback" title="Перезвоним за 15 минут" text="Оставьте номер — ответим на вопросы и поможем подобрать модель." submitLabel="Перезвоните мне" withComment />
      </div>
    </InfoPage>
  );
}
