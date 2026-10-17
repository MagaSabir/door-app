export type Category = "modern" | "classic" | "loft" | "scandi";

export type DoorColor = { id: string; name: string; hex: string };

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  gallery: string[];
  /** Фото конкретного цвета — галерея переключается при выборе */
  colorImages?: Partial<Record<string, string>>;
  rating: number;
  reviews: number;
  popularity: number;
  badge?: string;
  summary: string;
  description: string;
  colors: string[];
  sizes: number[];
  specs: { material: string; coating: string; glass: string; frame: string; warranty: string };
};

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "modern", label: "Современные" },
  { id: "classic", label: "Классика" },
  { id: "loft", label: "Лофт" },
  { id: "scandi", label: "Сканди" },
];

export const colors: DoorColor[] = [
  { id: "oak-grey", name: "Дуб серый", hex: "#b9aa9b" },
  { id: "graphite", name: "Графит", hex: "#45423f" },
  { id: "cappuccino", name: "Капучино", hex: "#8b7f74" },
  { id: "bleached-oak", name: "Беленый дуб", hex: "#d6c8b9" },
  { id: "walnut", name: "Орех светлый", hex: "#a69482" },
  { id: "white", name: "Белый", hex: "#f1eee9" },
  { id: "natural-oak", name: "Дуб натуральный", hex: "#c69a64" },
  { id: "light-grey", name: "Светло-серый", hex: "#a8a5a2" },
];

export const colorById = Object.fromEntries(colors.map((c) => [c.id, c])) as Record<string, DoorColor>;

const standardSizes = [600, 700, 800, 900];

export const products: Product[] = [
  {
    slug: "eco-2",
    name: "Эко-2",
    category: "modern",
    price: 12900,
    image: "/images/doors/eco-2.webp",
    gallery: ["/images/doors/eco-2.webp"],
    rating: 4.8,
    reviews: 86,
    popularity: 95,
    summary: "Строгая дверь с горизонтальной филёнкой. Выглядит дорого и подходит под тёмные интерьеры.",
    description:
      "Эко-2 — лаконичная модель с горизонтальной филёнкой. Глубокий графитовый оттенок подчёркивает минимализм и отлично сочетается с тёплым деревом и светлыми стенами.",
    colors: ["graphite", "cappuccino", "oak-grey"],
    sizes: standardSizes,
    specs: { material: "МДФ", coating: "Экошпон", glass: "Без стекла", frame: "Телескопическая (комплект)", warranty: "5 лет" },
  },
  {
    slug: "modern-1",
    name: "Модерн 1",
    category: "modern",
    price: 14900,
    image: "/images/doors/modern-1.webp",
    gallery: ["/images/doors/modern-1-large.webp", "/images/doors/modern-1.webp"],
    rating: 4.9,
    reviews: 124,
    popularity: 100,
    badge: "Хит продаж",
    summary:
      "Современная межкомнатная дверь в стиле модерн. Лаконичный дизайн, качественные материалы, подходит для любых интерьеров.",
    description:
      "Дверь Модерн 1 — это идеальное сочетание стиля, качества и доступной цены. Подходит для квартир, домов и офисов. Отлично смотрится в современных и классических интерьерах.",
    colors: ["oak-grey", "graphite", "cappuccino", "bleached-oak", "walnut"],
    sizes: standardSizes,
    specs: { material: "МДФ", coating: "Экошпон", glass: "Матовое", frame: "Телескопическая (комплект)", warranty: "5 лет" },
  },
  {
    slug: "loft",
    name: "Лофт",
    category: "loft",
    price: 16900,
    image: "/images/doors/loft.webp",
    gallery: ["/images/doors/loft.webp"],
    rating: 4.7,
    reviews: 58,
    popularity: 80,
    summary: "Фактурная дверь с вертикальной структурой — характерный акцент для интерьера в стиле лофт.",
    description:
      "Модель Лофт с выразительной вертикальной фактурой дерева. Тёмный оттенок и строгие пропорции делают её центром композиции в индустриальном интерьере.",
    colors: ["graphite", "cappuccino"],
    sizes: standardSizes,
    specs: { material: "Массив сосны + МДФ", coating: "Шпон", glass: "Без стекла", frame: "Телескопическая (комплект)", warranty: "5 лет" },
  },
  {
    slug: "classic",
    name: "Классика",
    category: "classic",
    price: 13900,
    image: "/images/doors/classic-graphite.webp",
    gallery: ["/images/doors/classic-graphite.webp", "/images/doors/classic-oak.webp"],
    colorImages: {
      graphite: "/images/doors/classic-graphite.webp",
      "natural-oak": "/images/doors/classic-oak.webp",
    },
    rating: 4.8,
    reviews: 97,
    popularity: 88,
    summary: "Две филёнки и строгие пропорции — классика вне времени и моды.",
    description:
      "Классика — дверь с двумя филёнками, которая органично впишется и в современный, и в классический интерьер. Надёжная конструкция и износостойкое покрытие. Доступна в цвете графит и натуральный дуб.",
    colors: ["graphite", "natural-oak"],
    sizes: standardSizes,
    specs: { material: "МДФ", coating: "Шпон", glass: "Без стекла", frame: "Телескопическая (комплект)", warranty: "5 лет" },
  },
  {
    slug: "modern-2",
    name: "Модерн 2",
    category: "modern",
    price: 15400,
    image: "/images/doors/modern-2.webp",
    gallery: ["/images/doors/modern-2.webp"],
    rating: 4.8,
    reviews: 42,
    popularity: 92,
    badge: "Новинка",
    summary: "Матовая эмаль, узкая стеклянная вставка и скрытые горизонтальные линии.",
    description:
      "Модерн 2 — минималистичная дверь в светло-сером цвете с узким матовым стеклом. Пропускает свет в коридор и визуально вытягивает потолок.",
    colors: ["light-grey", "white", "graphite"],
    sizes: standardSizes,
    specs: { material: "МДФ", coating: "Эмаль", glass: "Матовое", frame: "Телескопическая (комплект)", warranty: "5 лет" },
  },
  {
    slug: "scandi",
    name: "Сканди",
    category: "scandi",
    price: 15900,
    image: "/images/doors/scandi.webp",
    gallery: ["/images/doors/scandi.webp"],
    rating: 4.9,
    reviews: 71,
    popularity: 90,
    summary: "Светлая дверь в скандинавском стиле — визуально добавляет пространству воздуха.",
    description:
      "Сканди — светлая модель с аккуратной филёнкой. Идеальна для небольших помещений и интерьеров в скандинавском стиле.",
    colors: ["white", "bleached-oak", "oak-grey"],
    sizes: standardSizes,
    specs: { material: "МДФ", coating: "Эмаль", glass: "Без стекла", frame: "Телескопическая (комплект)", warranty: "5 лет" },
  },
];

/** All photos of a product, largest (gallery) first, without duplicates */
export function productImages(product: Product) {
  return [...new Set([...product.gallery, product.image, ...Object.values(product.colorImages ?? {})])].filter(
    (src): src is string => Boolean(src),
  );
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const navLinks = [
  { href: "/catalog", label: "Каталог" },
  { href: "/about", label: "О компании" },
  { href: "/delivery", label: "Доставка" },
  { href: "/installation", label: "Установка" },
  { href: "/contacts", label: "Контакты" },
];

export const phone = { display: "+7 (800) 555-77-33", href: "tel:+78005557733" };

// TODO: заменить заглушки реальными данными компании
export const company = {
  name: "ДвериГрад",
  email: "info@example.ru",
  address: "г. Москва, ул. Примерная, д. 1",
  showroom: "Шоурум: ТЦ «Пример», 2 этаж",
  hours: "Ежедневно с 9:00 до 21:00",
  /** Same hours in schema.org format — keep in sync with `hours` */
  openingHours: "Mo-Su 09:00-21:00",
  legal: "ООО «ДвериГрад», ИНН 0000000000",
};

// TODO: заменить на реальный контакт менеджера (Telegram/WhatsApp)
export const managerUrl = "https://t.me/your_manager";

/** Chat link with a prefilled message (t.me and wa.me links accept `?text=`) */
export function managerLink(text?: string) {
  return text ? `${managerUrl}?text=${encodeURIComponent(text)}` : managerUrl;
}

/** Query keys used to pass the chosen door into the measure form */
export const selectionParams = { model: "model", color: "color", size: "size" } as const;

export function describeSelection(model: string, color?: string, size?: string | number) {
  return [`Интересует: ${model}`, color && `цвет ${color}`, size && `ширина ${size} мм`].filter(Boolean).join(", ");
}

const priceFormatter = new Intl.NumberFormat("ru-RU");

export function formatPrice(value: number, from = true) {
  return `${from ? "от " : ""}${priceFormatter.format(value)} ₽`;
}

export function pluralize(n: number, forms: [string, string, string]) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return forms[0];
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return forms[1];
  return forms[2];
}
