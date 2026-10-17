import "server-only";

/** Sends a message to the managers' Telegram chat, or logs it when not configured. */
export async function notifyManager(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.info(`[notify] TELEGRAM_* не заданы, сообщение только в логе:\n${text}`);
    return;
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
    // Don't leave the form spinning if Telegram hangs
    signal: AbortSignal.timeout(8_000),
  });
  if (!res.ok) throw new Error(`Telegram API ${res.status}`);
}
