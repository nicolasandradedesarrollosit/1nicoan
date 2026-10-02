import { DEFAULT_LOCALE, LOCALES, type Lang, type Localized } from '../config/site';

export const ROUTES = {
  home: { es: '/', en: '/en/' },
  experience: { es: '/experiencia/', en: '/en/experience/' },
  projects: { es: '/proyectos/', en: '/en/projects/' },
} as const satisfies Record<string, Localized>;

export type RouteId = keyof typeof ROUTES | 'project';

export interface PageRoute {
  id: RouteId;
  slug?: string;
}

export function localizedPath(lang: Lang, route: RouteId = 'home', slug?: string): string {
  if (route === 'project') return `${ROUTES.projects[lang]}${slug}/`;
  return ROUTES[route][lang];
}

export const sectionPath = (lang: Lang, id: string) => `${ROUTES.home[lang]}#${id}`;

export const otherLang = (lang: Lang): Lang => LOCALES.find((l) => l !== lang) ?? DEFAULT_LOCALE;
