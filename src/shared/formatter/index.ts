const LOCALE = "fr-FR";

const dateShortFormatter = new Intl.DateTimeFormat(LOCALE, {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const dateLongFormatter = new Intl.DateTimeFormat(LOCALE, {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const datetimeLongFormatter = new Intl.DateTimeFormat(LOCALE, {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const amountFormatter = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: "EUR",
});

/** 25/01/2025 */
export function dateShort(date: Date | string): string {
  return dateShortFormatter.format(new Date(date));
}

/** samedi 25 janvier 2025 */
export function dateLong(date: Date | string): string {
  return dateLongFormatter.format(new Date(date));
}

/** samedi 25 janvier 2025 à 14h30 */
export function datetimeLong(date: Date | string): string {
  return datetimeLongFormatter
    .format(new Date(date))
    .replace(/(\d{2}):(\d{2})/, "$1h$2");
}

/** 1 234,56 € */
export function amount(value: number | string): string {
  return amountFormatter.format(Number(value));
}

/** YYYY-MM-DDTHH:MM for datetime-local input */
export function formatDatetimeLocal(date: Date | string): string {
  const d = new Date(date);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** YYYY-MM-DD for date input */
export function formatDateInput(date: Date | string): string {
  const d = new Date(date);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
