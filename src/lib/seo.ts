import { LOCALE_META, SITE, type Lang } from '../config/site';
import { ui } from '../i18n/ui';
import { localizedPath } from '../i18n/routes';

export const absUrl = (path: string) => new URL(path, SITE.url).href;

type JsonLd = Record<string, unknown>;

const PERSON_ID = `${SITE.url}/#person`;
const WEBSITE_ID = `${SITE.url}/#website`;

export function personLd(): JsonLd {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.name,
    jobTitle: SITE.role,
    url: SITE.url,
    email: `mailto:${SITE.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Rosario', addressCountry: 'AR' },
    sameAs: Object.values(SITE.social),
  };
}

export function websiteLd(lang: Lang): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absUrl(localizedPath(lang)),
    name: SITE.name,
    description: ui[lang].meta.home.description,
    inLanguage: LOCALE_META[lang].htmlLang,
    author: { '@id': PERSON_ID },
  };
}

export interface Crumb {
  name: string;
  href: string;
}

/** Breadcrumb trail for inner pages; always starts at the locale home. */
export function breadcrumbLd(lang: Lang, ...items: Crumb[]): JsonLd {
  const trail = [{ name: ui[lang].palette.home, href: localizedPath(lang) }, ...items];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absUrl(item.href),
    })),
  };
}

/** Wraps nodes in a single @graph that always includes Person and WebSite. */
export function graph(lang: Lang, ...nodes: JsonLd[]): JsonLd {
  return { '@context': 'https://schema.org', '@graph': [personLd(), websiteLd(lang), ...nodes] };
}
