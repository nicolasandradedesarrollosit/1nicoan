import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z.object({ es: z.string(), en: z.string() });

/**
 * Projects: one JSON file each; the file name is the URL slug (/proyectos/{id}/).
 * Screenshots go in src/content/projects/img and are referenced relatively
 * ("./img/name.png"); without one the card shows a generated placeholder.
 */
const projects = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One line, shown on cards and under the title. */
      summary: localized,
      role: localized,
      year: z.string(),
      problem: localized,
      solution: localized,
      results: z.array(localized).default([]),
      stack: z.array(z.string()).default([]),
      image: image().optional(),
      imageAlt: localized.optional(),
      gallery: z.array(image()).default([]),
      repo: z.url().optional(),
      demo: z.url().optional(),
      /** Shown large at the top of the home page section. */
      featured: z.boolean().default(false),
      /** Lower comes first. */
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
