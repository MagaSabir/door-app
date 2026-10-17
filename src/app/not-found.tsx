import Link from "next/link";
import { DoorClosed } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center lg:py-32">
      <span className="grid size-20 place-items-center rounded-full bg-surface">
        <DoorClosed className="size-9 stroke-[1.4]" />
      </span>
      <p className="mt-6 text-sm font-semibold text-ink-muted">Ошибка 404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight lg:text-4xl">Эта дверь никуда не ведёт</h1>
      <p className="mt-3 text-ink-muted">Страница не найдена или была перемещена. Попробуйте начать с главной или каталога.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/catalog" className="rounded-xl bg-ink px-6 py-3.5 text-white hover:bg-ink/90">
          В каталог
        </Link>
        <Link href="/" className="rounded-xl border border-line px-6 py-3.5 hover:bg-surface">
          На главную
        </Link>
      </div>
    </main>
  );
}
