import type { Localized } from '../config/site';

export interface SkillGroup {
  /** Also the colour token: text-front, text-back, text-tools. */
  id: 'front' | 'back' | 'tools';
  name: string;
  icon: 'layout' | 'server' | 'wrench';
  description: Localized;
  items: string[];
}

export const SKILLS: SkillGroup[] = [
  {
    id: 'front',
    name: 'Front',
    icon: 'layout',
    description: { es: 'SPAs y sistemas de componentes.', en: 'SPAs and component systems.' },
    items: ['React 19', 'TypeScript', 'Next.js', 'Redux Toolkit', 'RTK Query', 'Hero UI', 'AG Grid', 'Storybook', 'Vite'],
  },
  {
    id: 'back',
    name: 'Back',
    icon: 'server',
    description: { es: 'APIs, datos y documentación.', en: 'APIs, data and documentation.' },
    items: ['Node.js', 'Express', 'Go', 'Chi', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Swagger'],
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: 'wrench',
    description: { es: 'Entrega, testing, pagos y auth.', en: 'Delivery, testing, payments and auth.' },
    items: ['Git', 'Docker', 'AWS', 'GitHub Actions', 'Jest', 'Vitest', 'Playwright', 'Stripe', 'Mercado Pago', 'LogTo'],
  },
];
