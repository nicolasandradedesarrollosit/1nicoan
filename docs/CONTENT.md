# Editing content

Recipes for the common changes. Every text that visitors read exists in Spanish
and English: bilingual values are written as `{ es: '…', en: '…' }`.

After any change, run `npm run check` (it catches a missing translation or an
invalid project file) and look at both `/` and `/en/`.

## Change a text of the interface

Titles, buttons, labels and meta descriptions are in `src/i18n/ui.ts`, once per
locale. To add a new string, declare it in the `Dictionary` interface first, then
fill it in for `es` and `en`.

## Change name, email, links or the CV

`src/config/site.ts`:

- `SITE.email`, `SITE.social`, `SITE.location`.
- `SITE.url` is the public domain. It feeds canonical URLs, the sitemap and social
  previews, so it must be the real one before going live.
- `SITE.cv` holds one PDF per locale. Replace the files in `public/cv/` keeping
  the names, or update the paths.

## Add or edit a project

Each project is a JSON file in `src/content/projects/`. **The file name is the URL
slug**: `mi-proyecto.json` becomes `/proyectos/mi-proyecto/` and
`/en/projects/mi-proyecto/`.

```json
{
  "title": "Project name",
  "summary": { "es": "Una línea.", "en": "One line." },
  "role": { "es": "Full stack", "en": "Full stack" },
  "year": "2026",
  "problem": { "es": "…", "en": "…" },
  "solution": { "es": "…", "en": "…" },
  "results": [{ "es": "…", "en": "…" }],
  "stack": ["React", "TypeScript"],
  "image": "./img/mi-proyecto.png",
  "imageAlt": { "es": "…", "en": "…" },
  "gallery": ["./img/mi-proyecto-2.png"],
  "repo": "https://github.com/…",
  "demo": "https://…",
  "featured": true,
  "order": 1
}
```

- `image`, `imageAlt`, `gallery`, `repo`, `demo`, `results`, `featured`, `order` and
  `draft` are optional. Without `image` the card shows a numbered placeholder.
- Screenshots go in `src/content/projects/img/` and are referenced relative to the
  JSON file. Use a wide image (16:10 or 16:9), at least 1440px across.
- `order` sorts the projects, lowest first.
- `featured: true` shows the project large at the top of the home section. If
  several are flagged, the first in order wins.
- `"draft": true` hides a project everywhere.
- The technologies in `stack` become the filter chips on `/proyectos/`.

## Add or edit a job

`src/data/experience.ts`, newest first. Each job has:

- `start` and `end`: months as `'YYYY-MM'`. Leave `end` out while the job is ongoing.
  The chip ("Dic 2025 — Hoy · 11 meses") is computed from them, counting both the
  first and the last month as LinkedIn does (`src/lib/period.ts`).
- `highlights`: three short lines, shown on the home page.
- `details`: the full list, shown on `/experiencia/`.
- `stack`: the chips under the card.
- `current`: makes the timeline dot glow.
- `logo` (optional): see below. Without it the badge shows the company initial.

## Add a company logo

Put the file in `src/assets/logos/`, import it at the top of
`src/data/experience.ts` and assign it to the job's `logo` field. A square SVG or
PNG with a transparent background works best; the badge is drawn on white.

## Edit the profile block

`src/data/profile.ts`:

- The photo is `src/assets/portrait.jpg` (or `.jpeg`, `.png`, `.webp`, `.avif`): drop
  the file there and it replaces the monogram placeholder. Use a square image, at
  least 480px across.
- `FACTS` are the stat tiles. A tile with `percent` draws a ring and counts up to
  it; `value` must contain that number (for example `'~80%'` with `percent: 80`).
- `PROFILE_CODE` is the content of the `nicolas.ts` editor window, one array per
  line, each piece tagged with its syntax colour.

## Edit skills or education

`src/data/skills.ts` and `src/data/education.ts`. Skills also feed the scrolling
strip under the hero.

## Add a section to the home page

1. Add its id to `SECTIONS` in `src/config/site.ts` (order matters: it sets the
   header links and the `01 / …` numbering).
2. Add its name to `nav` in `src/i18n/ui.ts` for both locales.
3. Create the component in `src/components/home/`. Its root must be
   `<section id="{id}" data-section>` for the header highlight to work.
4. Render it in `src/components/pages/HomePage.astro`.

## Add a page

1. Declare it in `ROUTES` (`src/i18n/routes.ts`) with its path in each locale.
2. Create the page component in `src/components/pages/`, rendering `BaseLayout`
   with `route={{ id: '…' }}`.
3. Add one route file per locale under `src/pages/` that renders it with `lang`.
4. Add its title and description to `meta` in `src/i18n/ui.ts`.

## Add an icon

Paste the inner markup of a 24×24 stroke SVG (for example from
[Lucide](https://lucide.dev)) into `ICONS` in `src/components/ui/Icon.astro`.
