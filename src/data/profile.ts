import type { ImageMetadata } from 'astro';
import type { Localized } from '../config/site';

export const PORTRAIT: ImageMetadata | undefined = Object.values(
  import.meta.glob<{ default: ImageMetadata }>('../assets/portrait.{jpg,jpeg,png,webp,avif}', { eager: true }),
)[0]?.default;

export const FACTS: { value: string; percent?: number; label: Localized }[] = [
  { value: 'Go', label: { es: 'APIs sobre PostgreSQL', en: 'APIs on PostgreSQL' } },
  { value: '2', label: { es: 'Pasarelas de pago: Stripe y Mercado Pago', en: 'Payment gateways: Stripe and Mercado Pago' } },
  { value: 'MCP', label: { es: 'AI engineering: tools y dashboards para agentes', en: 'AI engineering: tools and dashboards for agents' } },
];

export type Token = ['kw' | 'str' | 'num' | 'dim' | 'plain', string];

export const PROFILE_CODE: Token[][] = [
  [
    ['kw', 'const'],
    ['plain', ' nicolas'],
    ['dim', ' = {'],
  ],
  [
    ['plain', '  role'],
    ['dim', ': '],
    ['str', "'Full Stack Engineer'"],
    ['dim', ','],
  ],
  [
    ['plain', '  frontend'],
    ['dim', ': ['],
    ['str', "'React'"],
    ['dim', ', '],
    ['str', "'TypeScript'"],
    ['dim', '],'],
  ],
  [
    ['plain', '  backend'],
    ['dim', ': ['],
    ['str', "'Node.js'"],
    ['dim', ', '],
    ['str', "'Go'"],
    ['dim', '],'],
  ],
  [
    ['plain', '  data'],
    ['dim', ': ['],
    ['str', "'PostgreSQL'"],
    ['dim', ', '],
    ['str', "'MongoDB'"],
    ['dim', '],'],
  ],
  [
    ['plain', '  ai'],
    ['dim', ': ['],
    ['str', "'MCP'"],
    ['dim', ', '],
    ['str', "'Agents'"],
    ['dim', '],'],
  ],
  [
    ['plain', '  basedIn'],
    ['dim', ': '],
    ['str', "'Rosario, AR'"],
    ['dim', ','],
  ],
  [
    ['dim', '} '],
    ['kw', 'as const'],
    ['dim', ';'],
  ],
];
