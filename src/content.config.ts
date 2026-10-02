import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z.object({ es: z.string(), en: z.string() });

const projects = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
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
      featured: z.boolean().default(false),
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
