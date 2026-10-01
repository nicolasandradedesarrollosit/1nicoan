/**
 * Job periods: "Dic 2025 — Hoy" and how long they lasted ("1 año 10 meses"), counted
 * the way LinkedIn does (both the first and the last month count as full months).
 * Shared by the build and the client, which refreshes ongoing jobs on each visit;
 * that is why its few words live here and not in the i18n dictionary.
 */
import type { Lang } from '../config/site';

/** A month as "YYYY-MM". */
export type YearMonth = `${number}-${number}`;

const COPY: Record<Lang, { months: string[]; present: string; year: [string, string]; month: [string, string] }> = {
  es: {
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    present: 'Hoy',
    year: ['año', 'años'],
    month: ['mes', 'meses'],
  },
  en: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    present: 'Present',
    year: ['yr', 'yrs'],
    month: ['mo', 'mos'],
  },
};

/** Months since year 0, so two of them can be subtracted. */
function monthIndex(value: YearMonth | Date) {
  if (value instanceof Date) return value.getFullYear() * 12 + value.getMonth();
  const [year, month] = value.split('-').map(Number);
  return year * 12 + month - 1;
}

/** Months from `start` to `end` (today when omitted), counting both ends. */
export function monthsBetween(start: YearMonth, end: YearMonth | Date = new Date()) {
  return Math.max(monthIndex(end) - monthIndex(start) + 1, 1);
}

/** 22 → "1 año 10 meses" / "1 yr 10 mos". */
export function formatDuration(lang: Lang, months: number) {
  const { year, month } = COPY[lang];
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [years && `${years} ${year[years === 1 ? 0 : 1]}`, rest && `${rest} ${month[rest === 1 ? 0 : 1]}`]
    .filter(Boolean)
    .join(' ');
}

/** "Dic 2025 — Hoy": without `end` the job is ongoing. */
export function formatPeriod(lang: Lang, start: YearMonth, end?: YearMonth) {
  const { months, present } = COPY[lang];
  const label = (value: YearMonth) => {
    const [year, month] = value.split('-').map(Number);
    return `${months[month - 1]} ${year}`;
  };
  return `${label(start)} — ${end ? label(end) : present}`;
}

/** Recomputes every `data-since="YYYY-MM"` duration, which was rendered at build time. */
export function initDurations() {
  const lang: Lang = document.documentElement.lang.startsWith('en') ? 'en' : 'es';
  document.querySelectorAll<HTMLElement>('[data-since]').forEach((el) => {
    el.textContent = formatDuration(lang, monthsBetween(el.dataset.since as YearMonth));
  });
}
