"use client";

import { useActionState, useId } from "react";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { requestCallback, type CallbackState } from "@/lib/actions/callback";
import { Field } from "@/components/ui/field";

const initialState: CallbackState = { status: "idle" };

export function CallbackForm({
  topic,
  title,
  text,
  submitLabel = "Отправить заявку",
  withComment = false,
}: {
  topic: "measure" | "callback";
  title: string;
  text?: string;
  submitLabel?: string;
  withComment?: boolean;
}) {
  const [state, action, pending] = useActionState(requestCallback, initialState);
  const idPrefix = useId().replace(/:/g, "");
  const errors = state.status === "error" ? (state.errors ?? {}) : {};
  const values = state.status === "error" ? state.values : undefined;

  return (
    <div className="rounded-3xl bg-surface p-5 lg:p-8">
      {state.status === "success" ? (
        <div className="flex flex-col items-center py-8 text-center" role="status">
          <CircleCheck className="size-12 stroke-[1.4] text-[#3a9a5b]" />
          <p className="mt-4 text-xl font-semibold">Заявка отправлена</p>
          <p className="mt-1 text-ink-muted">Перезвоним в течение 15 минут в рабочее время.</p>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold lg:text-2xl">{title}</h2>
          {text && <p className="mt-2 text-[15px] text-ink-muted">{text}</p>}
          <form action={action} className="mt-5 space-y-4" noValidate>
            <input type="hidden" name="topic" value={topic} />
            <Field
              idPrefix={idPrefix}
              label="Имя"
              name="name"
              autoComplete="name"
              defaultValue={values?.name}
              error={errors.name}
            />
            <Field
              idPrefix={idPrefix}
              label="Телефон"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7 900 000-00-00"
              defaultValue={values?.phone}
              error={errors.phone}
            />
            {withComment && (
              <label className="block">
                <span className="mb-1.5 block text-sm text-ink-muted">Комментарий</span>
                <textarea
                  name="comment"
                  rows={3}
                  maxLength={1000}
                  defaultValue={values?.comment}
                  placeholder="Адрес, количество дверей, удобное время"
                  className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-[16px] outline-none focus:border-ink/40"
                />
              </label>
            )}
            {state.status === "error" && state.message && (
              <p role="alert" className="rounded-xl bg-[#fdecec] px-4 py-3 text-sm text-[#b42318]">
                {state.message}
              </p>
            )}
            <button
              type="submit"
              disabled={pending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3.5 text-white transition hover:bg-ink/90 disabled:opacity-70"
            >
              {pending && <LoaderCircle className="size-5 animate-spin" />}
              {pending ? "Отправляем…" : submitLabel}
            </button>
            <p className="text-center text-xs text-ink-muted">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
            </p>
          </form>
        </>
      )}
    </div>
  );
}
