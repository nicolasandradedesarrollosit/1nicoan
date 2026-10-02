export const LOCALES = ['es', 'en'] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Lang = 'es';

export type Localized = Record<Lang, string>;

export const SITE = {
  name: 'Nicolás Andrade',
  role: 'Software Engineer',
  url: 'https://nicolasandrade.dev',
  email: 'nicolasandradedesarrollos@gmail.com',
  location: 'Rosario, Argentina',
  cv: {
    es: '/cv/CV_Nicolas_Andrade.pdf',
    en: '/cv/CV_Nicolas_Andrade_EN.pdf',
  },
  defaultOgImage: '/og-default.png',
  social: {
    github: 'https://github.com/nicolasandradedesarrollosit',
    linkedin: 'https://www.linkedin.com/in/nicol%C3%A1s-andrade-a5a7a136a',
  },
} as const;

export const LOCALE_META: Record<Lang, { htmlLang: string; ogLocale: string; label: string }> = {
  es: { htmlLang: 'es-AR', ogLocale: 'es_AR', label: 'ES' },
  en: { htmlLang: 'en', ogLocale: 'en_US', label: 'EN' },
};

export const SECTIONS = ['about', 'experience', 'projects', 'stack', 'contact'] as const;
export type SectionId = (typeof SECTIONS)[number];
