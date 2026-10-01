/** Degrees and languages, newest first. Shown on the home page and on /experiencia/. */
import type { Localized } from '../config/site';

export const EDUCATION: { title: Localized; place: Localized; period: Localized }[] = [
  {
    title: { es: 'Ingeniería en Sistemas', en: 'Systems Engineering' },
    place: {
      es: 'Universidad Abierta Interamericana · en curso',
      en: 'Universidad Abierta Interamericana · in progress',
    },
    period: { es: '2025 — 2027', en: '2025 — 2027' },
  },
  {
    title: { es: 'Tecnicatura Superior en Desarrollo de Software', en: 'Associate Degree in Software Development' },
    place: { es: 'Instituto Belgrano', en: 'Instituto Belgrano' },
    period: { es: '2022 — 2024', en: '2022 — 2024' },
  },
  {
    title: { es: 'Inglés B2', en: 'English B2' },
    place: { es: 'Preparación para el First Certificate (FCE)', en: 'Preparing for the First Certificate (FCE)' },
    period: { es: 'Actualidad', en: 'Present' },
  },
];
