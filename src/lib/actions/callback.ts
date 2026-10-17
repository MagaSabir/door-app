"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { notifyManager } from "@/lib/server/notify";
import { rateLimit } from "@/lib/server/rate-limit";
import { HONEYPOT_FIELD, nameSchema, phoneSchema } from "@/lib/validation";

export type CallbackState =
  | { status: "idle" }
  | {
      status: "error";
      message?: string;
      errors?: Partial<Record<"name" | "phone", string>>;
      values?: Record<"name" | "phone" | "comment", string>;
    }
  | { status: "success" };

const topics = { measure: "Бесплатный замер", callback: "Обратный звонок" } as const;

const schema = z.object({
  topic: z.enum(Object.keys(topics) as [keyof typeof topics]),
  name: nameSchema,
  phone: phoneSchema,
  comment: z.string().trim().max(1000).optional(),
});

export async function requestCallback(_prev: CallbackState, formData: FormData): Promise<CallbackState> {
  // Bot filled the honeypot — pretend success so it doesn't retry
  if (String(formData.get(HONEYPOT_FIELD) ?? "") !== "") return { status: "success" };

  const values = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    comment: String(formData.get("comment") ?? ""),
  };

  const parsed = schema.safeParse({
    topic: formData.get("topic"),
    name: formData.get("name"),
    phone: formData.get("phone"),
    comment: formData.get("comment") || undefined,
  });

  if (!parsed.success) {
    const errors: Partial<Record<"name" | "phone", string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if ((key === "name" || key === "phone") && !errors[key]) errors[key] = issue.message;
    }
    return { status: "error", errors, values, message: errors.name || errors.phone ? undefined : "Проверьте данные формы" };
  }

  // Count only valid submissions, so typos in the form don't lock a real customer out
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(`callback:${ip}`, { limit: 3, windowMs: 10 * 60_000 })) {
    return { status: "error", message: "Слишком много заявок подряд. Попробуйте через несколько минут или позвоните нам.", values };
  }

  const { topic, name, phone, comment } = parsed.data;
  try {
    await notifyManager(
      [`📞 ${topics[topic]}`, `Имя: ${name}`, `Телефон: ${phone}`, comment ? `Комментарий: ${comment}` : null]
        .filter(Boolean)
        .join("\n"),
    );
  } catch (e) {
    console.error("[callback] notify failed", e);
    return { status: "error", message: "Не удалось отправить заявку. Позвоните нам, пожалуйста.", values };
  }

  return { status: "success" };
}
