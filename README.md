# Nicolás Andrade — portfolio

Personal portfolio of Nicolás Andrade, Software Engineer. A static, bilingual
(Spanish / English) site built with Astro and Tailwind CSS.

## Stack

- [Astro 7](https://astro.build) with static output and client-side navigation (`<ClientRouter />`)
- [Tailwind CSS v4](https://tailwindcss.com) through the Vite plugin
- TypeScript in strict mode
- Geist and Geist Mono via the Astro Fonts API
- Deployed to Vercel (`@astrojs/vercel`)

There is no UI framework and no animation library: interactivity is a few small
TypeScript modules, and most motion is plain CSS.

## Getting started

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev       # dev server at http://localhost:4321
```

| Command           | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload           |
| `npm run check`   | Type-check `.astro` and `.ts` files            |
| `npm run build`   | Build the static site into `dist/`             |
| `npm run preview` | Serve the production build locally             |

Run `npm run check` and `npm run build` before pushing; there is no test suite.

## Routes

| Spanish (default)      | English                  | Page                                   |
| ---------------------- | ------------------------ | -------------------------------------- |
| `/`                    | `/en/`                   | Home                                   |
| `/experiencia/`        | `/en/experience/`        | Full work history and education        |
| `/proyectos/`          | `/en/projects/`          | All projects, filterable by technology |
| `/proyectos/[slug]/`   | `/en/projects/[slug]/`   | Project case study                     |

Also generated: `/404`, `/robots.txt` and `/sitemap-index.xml`.

## Project structure

```
public/                 Static files served as-is (CVs, favicon, social image)
src/
  assets/logos/         Company logos, optimized by Astro
  config/site.ts        Identity, links, locales, home sections
  content/projects/     One JSON file per project (+ img/ for screenshots)
  content.config.ts     Schema of the projects collection
  data/                 Experience, profile facts, skills, education
  i18n/
    routes.ts           Every page and its path per locale
    ui.ts               Interface copy in both locales
  lib/                  SEO helpers, project queries and client-side code
    client.ts           Single client entry point
    loader.ts           Page curtain shown on theme and language changes
    palette.ts          Command palette
    motion/             Scroll and pointer effects
  components/
    layout/             Header, footer, language switch, theme toggle, curtain
    home/               Sections of the home page
    pages/              One component per page; route files render these
    seo/                Meta tags and JSON-LD
    ui/                 Shared pieces (cards, timeline, icons, palette…)
  layouts/BaseLayout.astro
  pages/                Route files (thin wrappers, one per locale)
  styles/index.css      Design tokens and shared component classes
```

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — how routing, i18n, theming, motion and the client code fit together.
- [docs/CONTENT.md](docs/CONTENT.md) — how to edit copy, add a project, a job, a logo or a page.
- [AGENTS.md](AGENTS.md) — conventions for anyone (or any tool) changing the code.

## Before going live

- Set the real domain in `SITE.url` (`src/config/site.ts`); it drives canonical URLs, the sitemap and Open Graph tags.
- Replace the placeholder projects in `src/content/projects/`.
