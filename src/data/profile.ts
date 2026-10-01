import type { Localized } from '../config/site';

/** Stat tiles of the profile bento. `percent` draws a ring and counts up to it. */
export const FACTS: { value: string; percent?: number; label: Localized }[] = [
  { value: '~80%', percent: 80, label: { es: 'Cobertura de tests unitarios', en: 'Unit test coverage' } },
  { value: 'SOC 2', label: { es: 'Type II · auth y MFA en producción', en: 'Type II · auth and MFA in production' } },
  { value: '1 / 6', label: { es: 'Startups en Endeavor Scale Up', en: 'Startups in Endeavor Scale Up' } },
];

/** A piece of a code line: [token class, text]. Classes are the .tok-* ones in index.css. */
export type Token = ['kw' | 'str' | 'num' | 'dim' | 'plain', string];

/** Contents of the editor window in the profile bento. */
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
    ['plain', '  testCoverage'],
    ['dim', ': '],
    ['num', '0.8'],
    ['dim', ','],
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
