import { z } from "zod";

/** Hidden form field that people never see; bots fill every input */
export const HONEYPOT_FIELD = "website";

export const nameSchema = z.string().trim().min(2, "Укажите имя").max(80);

export const phoneSchema = z
  .string()
  .trim()
  .refine((v) => /^\+?[78]?\d{10}$/.test(v.replace(/[\s()-]/g, "")), "Введите телефон в формате +7 900 000-00-00");
