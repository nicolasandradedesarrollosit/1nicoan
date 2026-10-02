import type { ImageMetadata } from 'astro';
import type { Localized } from '../config/site';
import type { YearMonth } from '../lib/period';
import teramotLogo from '../assets/logos/teramot.jpeg';

export interface Job {
  company: Localized;
  logo?: ImageMetadata;
  role: string;
  start: YearMonth;
  end?: YearMonth;
  current: boolean;
  highlights: Localized[];
  details: Localized[];
  stack: string[];
}

export const EXPERIENCE: Job[] = [
  {
    company: { es: 'Teramot', en: 'Teramot' },
    logo: teramotLogo,
    role: 'Software Engineer',
    start: '2025-12',
    current: true,
    highlights: [
      {
        es: 'App 2.0 de punta a punta: SPA en React 19 y APIs en Go sobre PostgreSQL.',
        en: 'The 2.0 app end to end: a React 19 SPA and Go APIs on PostgreSQL.',
      },
      {
        es: 'Pasarela de pagos de punta a punta: Stripe internacional y Mercado Pago local.',
        en: 'Payment gateway end to end: Stripe for international, Mercado Pago for local.',
      },
      {
        es: 'AI engineering con MCP: tools y dashboards para agentes, sobre datos de AWS Athena.',
        en: 'AI engineering with MCP: tools and dashboards for agents, on AWS Athena data.',
      },
    ],
    details: [
      {
        es: 'Lideré el desarrollo frontend de la aplicación web 2.0 con ownership total del producto: SPA con React 19 y Vite optimizada para uso masivo, con estado en Redux Toolkit y RTK Query.',
        en: 'Led frontend development of the 2.0 web app with full product ownership: a React 19 and Vite SPA optimized for heavy use, with state in Redux Toolkit and RTK Query.',
      },
      {
        es: 'Desarrollé un módulo de visualización de datos con AG Grid, conectado directamente a AWS Athena.',
        en: 'Built a data visualization module with AG Grid, connected directly to AWS Athena.',
      },
      {
        es: 'Desarrollé una herramienta de visualización de dashboards a través de MCP (Model Context Protocol), creando las tools y llevando la iteración end-to-end.',
        en: 'Built a dashboard visualization tool through MCP (Model Context Protocol), creating the tools and driving the iteration end to end.',
      },
      {
        es: 'Migré la autenticación al proveedor externo LogTo, habilitando MFA segmentada por empresa y contribuyendo a la certificación SOC 2 Type II.',
        en: 'Migrated authentication to the external provider LogTo, enabling per-company MFA and contributing to the SOC 2 Type II certification.',
      },
      {
        es: 'Implementé Content Security Policy (CSP) y definí políticas de seguridad en el frontend.',
        en: 'Implemented Content Security Policy (CSP) and defined frontend security policies.',
      },
      {
        es: 'Implementé de extremo a extremo la pasarela de pagos: Stripe para pagos internacionales y Mercado Pago para pagos locales.',
        en: 'Implemented the payment gateway end to end: Stripe for international payments and Mercado Pago for local ones.',
      },
      {
        es: 'Contribuí al backend creando APIs en Go con Chi, documentación en Swagger y Gorm sobre PostgreSQL, y definiendo nuevas abstracciones del diagrama de dominio.',
        en: 'Contributed to the backend with Go APIs on Chi, Swagger documentation and Gorm on PostgreSQL, and defined new abstractions in the domain model.',
      },
      {
        es: 'Optimicé el rendimiento aplicando lazy loading y prácticas modernas de React 19 (use, Suspense).',
        en: 'Optimized performance with lazy loading and modern React 19 practices (use, Suspense).',
      },
      {
        es: 'Documenté el sistema de componentes con Storybook, utilizando Hero UI como librería base.',
        en: 'Documented the component system with Storybook, using Hero UI as the base library.',
      },
      {
        es: 'Alcancé una cobertura de tests unitarios del frontend cercana al 80%.',
        en: 'Reached close to 80% unit test coverage on the frontend.',
      },
      {
        es: 'Incorporé programación asistida por agentes de IA, incrementando la productividad propia y del equipo.',
        en: 'Introduced AI-agent-assisted programming, raising my own and the team’s productivity.',
      },
    ],
    stack: ['React 19', 'TypeScript', 'Go', 'PostgreSQL', 'MCP', 'Stripe', 'Mercado Pago'],
  },
  {
    company: { es: 'Freelance y proyectos personales', en: 'Freelance & personal projects' },
    role: 'Software Engineer',
    start: '2025-01',
    current: false,
    highlights: [
      {
        es: 'ERP de gestión de pedidos full stack en TypeScript para un negocio local.',
        en: 'Full-stack order management ERP in TypeScript for a local business.',
      },
      {
        es: 'API REST en FastAPI que integra modelos de lenguaje de Anthropic.',
        en: 'REST API in FastAPI integrating Anthropic language models.',
      },
      {
        es: 'CI/CD con GitHub Actions y automatizaciones con Playwright.',
        en: 'CI/CD with GitHub Actions and automations with Playwright.',
      },
    ],
    details: [
      {
        es: 'Desarrollé un ERP de gestión de pedidos para un negocio local (full stack, TypeScript).',
        en: 'Built an order management ERP for a local business (full stack, TypeScript).',
      },
      { es: 'Construí un e-commerce con React y Node.', en: 'Built an e-commerce site with React and Node.' },
      {
        es: 'Integré modelos de lenguaje de Anthropic mediante una API REST en FastAPI (Python), aplicando prompt engineering para optimizar las respuestas.',
        en: 'Integrated Anthropic language models through a REST API in FastAPI (Python), applying prompt engineering to improve responses.',
      },
      {
        es: 'Implementé automatizaciones y web scraping con Playwright e Instagrapi.',
        en: 'Implemented automations and web scraping with Playwright and Instagrapi.',
      },
      {
        es: 'Configuré pipelines CI/CD en GitHub Actions, branch protection rules y merge guards, estandarizando los workflows colaborativos del equipo.',
        en: 'Set up CI/CD pipelines in GitHub Actions, branch protection rules and merge guards, standardizing the team’s collaborative workflows.',
      },
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'FastAPI', 'Playwright', 'GitHub Actions'],
  },
];
