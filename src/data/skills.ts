import type { Localized } from '../config/site';

/** Skill groups: the stack rows of the home page and the technologies marquee. */
export interface SkillGroup {
  /** Also the colour token: bg-front, bg-back, bg-tools. */
  id: 'front' | 'back' | 'tools';
  name: string;
  description: Localized;
  items: string[];
}

export const SKILLS: SkillGroup[] = [
  {
    id: 'front',
    name: 'Front',
    description: { es: 'SPAs y sistemas de componentes.', en: 'SPAs and component systems.' },
    items: ['React 19', 'TypeScript', 'Next.js', 'Redux Toolkit', 'RTK Query', 'Hero UI', 'AG Grid', 'Storybook', 'Vite'],
  },
  {
    id: 'back',
    name: 'Back',
    description: { es: 'APIs, datos y documentación.', en: 'APIs, data and documentation.' },
    items: ['Node.js', 'Express', 'Go', 'Chi', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Swagger'],
  },
  {
    id: 'tools',
    name: 'Tools',
    description: { es: 'Entrega, testing, pagos y auth.', en: 'Delivery, testing, payments and auth.' },
    items: ['Git', 'Docker', 'AWS', 'GitHub Actions', 'Jest', 'Vitest', 'Playwright', 'Stripe', 'Mercado Pago', 'LogTo'],
  },
];
