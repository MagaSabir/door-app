# ДвериГрад

Сайт-каталог межкомнатных дверей: главная, каталог с фильтрами, карточки товаров, страницы «О компании», «Доставка и оплата», «Установка», «Контакты». Заявки на замер и обратный звонок уходят менеджеру в Telegram.

## Стек

- [Next.js 16](https://nextjs.org) (App Router, Cache Components, Server Actions)
- React 19, TypeScript
- Tailwind CSS 4
- Zod — валидация форм на сервере
- lucide-react — иконки

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
```

Продакшен-сборка:

```bash
npm run build
npm start
```

## Переменные окружения

Скопируйте `.env.example` в `.env.local` и заполните:

| Переменная | Назначение |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Публичный адрес сайта (для OG-картинок) |
| `TELEGRAM_BOT_TOKEN` | Токен бота от @BotFather |
| `TELEGRAM_CHAT_ID` | ID чата менеджеров, куда приходят заявки |

Без Telegram-переменных заявки только пишутся в лог сервера.

## Структура

```
src/
  app/                 страницы (App Router)
    catalog/           каталог и страницы товаров /catalog/[slug]
    about, delivery, installation, contacts
  components/          UI-компоненты
    catalog/           фильтры и список каталога
    product/           галерея, просмотр фото, информация о товаре
    info/              блоки информационных страниц и форма заявки
  lib/
    data.ts            товары, цвета, контакты компании
    actions/           server actions (заявки)
    server/            серверные утилиты (отправка в Telegram)
public/images/         оптимизированные изображения (webp)
```

## Как добавить модель

1. Положите фото в `public/images/doors/` (webp, по высоте до ~1800px).
2. Добавьте объект в массив `products` в `src/lib/data.ts`.
3. Для фото под конкретный цвет укажите `colorImages: { "<id цвета>": "/images/doors/..." }` — галерея переключится при выборе цвета.
