## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

## Project conventions

- Personal portfolio, bilingual. Code, comments and docs in English.
- Keep copy short: one line per idea. The long version lives in `/experiencia/` and the downloadable CV.

### Routes

- Every page and its path per locale is declared in `src/i18n/routes.ts` (`ROUTES`, `localizedPath`). Never write a URL by hand.
- `src/pages/` files are thin: each renders a component from `src/components/pages/` with `lang`. A new page needs an entry in `ROUTES`, a page component, and one file per locale under `src/pages/`.
- Pages pass `route={{ id, slug? }}` to `BaseLayout` so the language switch and `hreflang` point to the same page in the other locale.
- Navigation is client-side (`<ClientRouter />`). Downloads need `data-astro-reload`.

### Content

- Identity, links, locales and home sections → `src/config/site.ts`.
- Interface copy (both locales) → `src/i18n/ui.ts`.
- Experience, profile facts, skills, education → `src/data/*.ts` (bilingual strings are `{ es, en }`).
- Company logos → `src/assets/logos/`, imported in `src/data/experience.ts` (`logo`), so Astro optimizes them.
- Projects → one JSON per project in `src/content/projects/` (schema in `src/content.config.ts`); the file name is the URL slug. Screenshots go in `src/content/projects/img/` and are referenced as `"image": "./img/name.png"`; without one a placeholder is drawn.

### Styling and motion

- Tailwind CSS v4: tokens, light/dark colours and shared classes (`.wrap`, `.section`, `.card`, `.kicker`, `.title`, `.btn`, `.chip`, `.timeline`…) in `src/styles/index.css`; utilities for one-off layout.
- Light and dark themes via `data-theme` on `<html>` (inline script in `BaseLayout.astro`). Always use the colour tokens (`bg-bg`, `text-muted`, `border-line`…), never raw colours.
- Motion is progressive enhancement: every element is fully visible at rest, so the page reads the same without JS and with `prefers-reduced-motion`. Prefer CSS (keyframes, scroll-driven animations behind `@supports`).
- Behaviour is opt-in through data attributes: `data-reveal`, `data-stagger`, `data-spotlight`, `data-tilt`, `data-magnetic`, `data-count`, `data-copy`, `data-theme-toggle`, `data-lang-switch`, `data-palette-open`, `data-filter`.
- Client code: one entry, `src/lib/client.ts`. Clicks are delegated on `document`; per-element setup runs on `astro:page-load` because the router swaps pages without reloading. Never add a one-off `<script>` that runs only on first load.
- Theme and language changes run behind the monogram curtain (`src/lib/loader.ts`, `PageLoader.astro`).
- The download buttons serve the CV of the current locale from `public/cv/` (paths in `SITE.cv`).
