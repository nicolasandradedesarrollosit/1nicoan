# Architecture

How the site is put together and why. For day-to-day edits see
[CONTENT.md](CONTENT.md); for the rules to follow when changing code see
[AGENTS.md](../AGENTS.md).

## Principles

1. **Nothing is hardcoded in components.** Identity lives in `config/`, content in
   `data/` and `content/`, interface copy in `i18n/ui.ts`. Components only lay it out.
2. **Static first.** Every page is built to HTML. JavaScript adds behaviour on top
   and the site stays readable without it.
3. **Motion is progressive enhancement.** Every animated element is fully visible in
   its resting state, so the page looks the same with JavaScript off or with
   `prefers-reduced-motion` on.

## Routing and i18n

Spanish is the default locale and has no prefix; English lives under `/en/`
(`i18n` block in `astro.config.mjs`).

`src/i18n/routes.ts` is the single source of truth for URLs:

- `ROUTES` maps each page id to its path in every locale.
- `localizedPath(lang, route, slug?)` builds a URL. Components never write one by hand.
- `sectionPath(lang, id)` links to a section of the home page from anywhere.

Route files in `src/pages/` are thin wrappers. Each one renders a component from
`src/components/pages/` and passes `lang`:

```astro
---
import ExperiencePage from '../../components/pages/ExperiencePage.astro';
---

<ExperiencePage lang="es" />
```

Each page component hands its identity to the layout as `route={{ id, slug? }}`.
`BaseLayout` forwards it to:

- `SEO.astro`, which emits `hreflang` links to the same page in the other locale;
- `LangSwitch.astro` and the command palette, so switching language keeps you on
  the same page instead of sending you home.

Interface copy is a typed dictionary (`Dictionary` in `i18n/ui.ts`). A key missing
in one locale is a type error. Content strings are `Localized` objects, `{ es, en }`.

## Content

| What                                   | Where                              |
| -------------------------------------- | ---------------------------------- |
| Name, email, social links, CV paths    | `src/config/site.ts`               |
| Work history                           | `src/data/experience.ts`           |
| Profile stat tiles and the editor code | `src/data/profile.ts`              |
| Skill groups                           | `src/data/skills.ts`               |
| Education                              | `src/data/education.ts`            |
| Projects                               | `src/content/projects/*.json`      |

Projects are an Astro content collection (`src/content.config.ts`) validated with
Zod. The file name is the URL slug. `src/lib/projects.ts` returns them sorted and
builds the static paths for the detail routes.

## Layout and SEO

`BaseLayout.astro` owns the document: fonts, meta tags, JSON-LD, the header, footer,
command palette, page curtain and the client script.

- `components/seo/SEO.astro` — title, description, canonical, `hreflang`, Open Graph.
- `lib/seo.ts` — JSON-LD builders. Every page gets `Person` and `WebSite`; inner
  pages add a `BreadcrumbList`.
- `@astrojs/sitemap` generates the sitemap with locale alternates.

## Styling

Tailwind CSS v4, configured in CSS (`src/styles/index.css`), in three layers:

- **Tokens.** Raw colours are CSS variables on `:root`, redefined for the dark theme.
  `@theme inline` exposes them as utilities (`bg-bg`, `text-muted`, `border-line`,
  `text-accent`…). Components use tokens only, never raw colours. The one exception
  is the macOS window buttons in `CodeWindow.astro`, which are fixed brand colours.
- **Base.** Element defaults, focus ring, reduced-motion reset.
- **Components.** Classes shared across sections: `.wrap`, `.section`, `.card`,
  `.kicker`, `.title`, `.label`, `.btn`, `.chip`, `.timeline`, `.marquee`, `.loader`…
  One-off layout stays in utility classes in the markup.

### Theme

The theme is the `data-theme` attribute on `<html>`. An inline script in the head
of `BaseLayout.astro` sets it before first paint (stored choice, else the system
preference) and again after every client-side navigation, because the router
replaces the attributes of `<html>`. A media query covers visitors without
JavaScript.

## Client-side code

Navigation is client-side: `<ClientRouter />` swaps the page without a full reload
and animates between pages with view transitions. Project cards share
`transition:name` values with the detail page, so the image and title morph.

This changes how scripts must be written. There is a single entry point,
`src/lib/client.ts`, imported once from `BaseLayout`:

- **Clicks are delegated on `document`**, keyed by data attributes. They keep
  working after the page is swapped.
- **Per-element setup runs on `astro:page-load`**, which fires on first load and
  after every navigation.

Behaviour is opt-in through data attributes:

| Attribute             | Effect                                                  | Module              |
| --------------------- | ------------------------------------------------------- | ------------------- |
| `data-reveal`         | Fades in when scrolled into view                        | `motion/scroll.ts`  |
| `data-stagger`        | Children reveal one after another                       | `motion/scroll.ts`  |
| `data-count`          | Number counts up when revealed                          | `motion/scroll.ts`  |
| `data-section` / `data-spy` | Header highlights the section in view             | `motion/scroll.ts`  |
| `data-spotlight`      | Exposes cursor position as `--mx` / `--my`              | `motion/pointer.ts` |
| `data-tilt`           | Leans towards the cursor                                | `motion/pointer.ts` |
| `data-magnetic`       | Is pulled towards the cursor                            | `motion/pointer.ts` |
| `data-theme-toggle`   | Switches theme                                          | `client.ts`         |
| `data-lang-switch`    | Navigates to the other locale behind the curtain        | `client.ts`         |
| `data-copy`           | Copies its value to the clipboard                       | `client.ts`         |
| `data-menu-toggle`    | Opens the mobile menu                                   | `client.ts`         |
| `data-filter` / `data-stack` | Filters project cards by technology              | `client.ts`         |
| `data-palette-open`   | Opens the command palette                               | `palette.ts`        |

Pointer effects are skipped on touch devices; all motion is skipped with
`prefers-reduced-motion`.

Some effects need no JavaScript at all: the experience timeline fill and the
reading progress bar use CSS scroll-driven animations behind `@supports`, and the
hero letters, marquee and editor window are CSS keyframes.

### Page curtain

Theme and language changes happen behind a full-screen curtain with a thin bar
sweeping across it (`PageLoader.astro`, `lib/loader.ts`, `.loader` in the CSS).
It is driven by `data-loading` on `<html>`: `out` on the page being left, `in` on
the incoming one, so the curtain stays up across the swap.

For a language change the curtain wraps a router navigation, with three details:

- The language links carry `data-astro-reload` so the router's own click handler
  ignores them; otherwise both would navigate.
- The router's cross-fade is skipped (`viewTransition.skipTransition()`), since the
  curtain already hides the swap.
- Entrance animations stay paused while the curtain is up and play as it lifts.

### Command palette

`CommandPalette.astro` renders a `<dialog>` whose items are ordinary links and
buttons carrying the same data attributes as the rest of the UI. `lib/palette.ts`
only opens it (Cmd/Ctrl+K or the header button), filters and moves the selection;
activating an item just clicks it.

## Build and deploy

`npm run build` produces static HTML in `dist/`. Stylesheets are inlined
(`build.inlineStylesheets: 'always'`) because the CSS is small. Images referenced
from `src/` are optimized at build time. `vercel.json` adds caching and basic
security headers.
