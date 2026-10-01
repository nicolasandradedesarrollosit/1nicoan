import { DEFAULT_LOCALE, LOCALES, type Lang, type Localized } from '../config/site';

/**
 * Every page of the site and its path in each locale. Pages, the language switch
 * and hreflang links all resolve URLs from here.
 */
export const ROUTES = {
  home: { es: '/', en: '/en/' },
  experience: { es: '/experiencia/', en: '/en/experience/' },
  projects: { es: '/proyectos/', en: '/en/projects/' },
} as const satisfies Record<string, Localized>;

/** "project" is a project detail page: the projects path plus its slug. */
export type RouteId = keyof typeof ROUTES | 'project';

/** The page being rendered, so the layout can link to its other-locale twin. */
export interface PageRoute {
  id: RouteId;
  slug?: string;
}

export function localizedPath(lang: Lang, route: RouteId = 'home', slug?: string): string {
  if (route === 'project') return `${ROUTES.projects[lang]}${slug}/`;
  return ROUTES[route][lang];
}

/** A section of the home page, from any page. */
export const sectionPath = (lang: Lang, id: string) => `${ROUTES.home[lang]}#${id}`;

/** The locale the language switch points to. */
export const otherLang = (lang: Lang): Lang => LOCALES.find((l) => l !== lang) ?? DEFAULT_LOCALE;
