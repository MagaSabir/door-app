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
| `NEXT_PUBLIC_SITE_URL` | Публичный адрес сайта: canonical, sitemap, превью ссылок. На Vercel по умолчанию — продакшен-домен проекта |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | Код подтверждения Яндекс.Вебмастера |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | Код подтверждения Google Search Console |
| `TELEGRAM_BOT_TOKEN` | Токен бота от @BotFather |
| `TELEGRAM_CHAT_ID` | ID чата менеджеров, куда приходят заявки |
| `ALLOWED_DEV_ORIGINS` | Только для разработки: адреса через запятую, с которых можно открыть dev-сервер |

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

## Проверки и тесты

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript
npm run build       # продакшен-сборка (нужна перед e2e)
npm run test:e2e    # Playwright: десктоп + мобильный профиль
```

Первый запуск тестов: `npx playwright install chromium`. На Ubuntu новее 24.04 Playwright может не узнать систему — тогда добавьте `PLAYWRIGHT_HOST_PLATFORM_OVERRIDE=ubuntu24.04-x64` перед командой.

На каждый push в `main` и pull request GitHub Actions (`.github/workflows/ci.yml`) запускает все проверки.

Dev-сервер с телефона в той же сети: в `.env.local` укажите `ALLOWED_DEV_ORIGINS=<IP компьютера>`.

## SEO

- `sitemap.xml`, `robots.txt` и манифест генерируются автоматически (`src/app/sitemap.ts`, `robots.ts`, `manifest.ts`); новые модели попадают в sitemap сами.
- Превью для мессенджеров и соцсетей (1200×630) собираются из фото: `src/app/opengraph-image.ts` и `src/app/catalog/[slug]/opengraph-image.ts`.
- Микроразметка schema.org (организация, товары, хлебные крошки) — `src/lib/json-ld.tsx`.
- На preview-деплоях Vercel `robots.txt` закрывает сайт от индексации.

## Как добавить модель

1. Положите фото в `public/images/doors/` (webp, по высоте до ~1800px).
2. Добавьте объект в массив `products` в `src/lib/data.ts`.
3. Для фото под конкретный цвет укажите `colorImages: { "<id цвета>": "/images/doors/..." }` — галерея переключится при выборе цвета.
