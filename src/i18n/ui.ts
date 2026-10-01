import type { Lang, SectionId } from '../config/site';

// Adding a string: declare it in Dictionary, then fill it in for every locale below.
// TypeScript fails the build if a locale is missing a key.
/** All interface copy. Content data (experience, skills…) lives in src/data. */
interface Dictionary {
  meta: {
    home: { title: string; description: string };
    experience: { title: string; description: string };
    projects: { title: string; description: string };
  };
  skip: string;
  nav: Record<SectionId, string>;
  navLabel: string;
  menu: string;
  theme: string;
  switchLang: string;
  hero: { tagline: string; downloadCv: string; viewProjects: string; scroll: string };
  about: { title: string; body: string; now: string; nowText: string };
  experience: { title: string; more: string; pageTitle: string; pageLead: string };
  projects: {
    title: string;
    all: string;
    featured: string;
    view: string;
    pageTitle: string;
    pageLead: string;
    filterLabel: string;
    filterAll: string;
    role: string;
    year: string;
    problem: string;
    solution: string;
    results: string;
    gallery: string;
    previous: string;
    next: string;
    repo: string;
    demo: string;
  };
  stack: { title: string };
  education: { title: string };
  contact: { title: string; lead: string; copy: string; copied: string };
  palette: {
    open: string;
    placeholder: string;
    sections: string;
    pages: string;
    actions: string;
    empty: string;
    home: string;
  };
  footer: { top: string };
  notFound: { title: string; body: string; home: string };
}

export const ui: Record<Lang, Dictionary> = {
  es: {
    meta: {
      home: {
        title: 'Nicolás Andrade — Software Engineer',
        description:
          'Software Engineer full stack en Rosario, Argentina. Construyo productos SaaS B2B de punta a punta con React, TypeScript, Node.js y Go.',
      },
      experience: {
        title: 'Experiencia — Nicolás Andrade',
        description:
          'Trayectoria de Nicolás Andrade: plataforma 2.0 de Teramot, proyectos freelance y formación.',
      },
      projects: {
        title: 'Proyectos — Nicolás Andrade',
        description: 'Proyectos de Nicolás Andrade: productos web con React, TypeScript, Node.js y Go.',
      },
    },
    skip: 'Saltar al contenido',
    nav: { about: 'Perfil', experience: 'Experiencia', projects: 'Proyectos', stack: 'Stack', contact: 'Contacto' },
    navLabel: 'Secciones',
    menu: 'Menú',
    theme: 'Cambiar tema',
    switchLang: 'Read in English',
    hero: {
      tagline: 'Construyo productos SaaS B2B de punta a punta: de la interfaz en React a las APIs en Node.js y Go.',
      downloadCv: 'Descargar CV',
      viewProjects: 'Ver proyectos',
      scroll: 'Scroll',
    },
    about: {
      title: 'Full stack, de la interfaz a los datos.',
      body: 'Trabajo en la plataforma 2.0 de Teramot, una de las seis startups del programa Scale Up de Endeavor: interfaces en React y TypeScript, APIs en Go y Node.js, datos en PostgreSQL.',
      now: 'Ahora',
      nowText: 'Construyendo Teramot 2.0, front y back.',
    },
    experience: {
      title: 'Trayectoria',
      more: 'Ver trayectoria completa',
      pageTitle: 'Experiencia',
      pageLead: 'Qué hice en cada lugar, sin resumir.',
    },
    projects: {
      title: 'Proyectos seleccionados',
      all: 'Ver todos',
      featured: 'Destacado',
      view: 'Ver proyecto',
      pageTitle: 'Proyectos',
      pageLead: 'Productos y herramientas que construí.',
      filterLabel: 'Filtrar por tecnología',
      filterAll: 'Todos',
      role: 'Rol',
      year: 'Año',
      problem: 'Problema',
      solution: 'Solución',
      results: 'Resultados',
      gallery: 'Galería',
      previous: 'Anterior',
      next: 'Siguiente',
      repo: 'Código',
      demo: 'Demo',
    },
    stack: { title: 'Con qué trabajo' },
    education: { title: 'Formación' },
    contact: {
      title: '¿Hablamos?',
      lead: 'Escribime por email o LinkedIn.',
      copy: 'Copiar email',
      copied: 'Copiado',
    },
    palette: {
      open: 'Buscar',
      placeholder: 'Ir a…',
      sections: 'Secciones',
      pages: 'Páginas',
      actions: 'Acciones',
      empty: 'Sin resultados',
      home: 'Inicio',
    },
    footer: { top: 'Volver arriba' },
    notFound: { title: 'Página no encontrada', body: 'Esta página no existe.', home: 'Ir al inicio' },
  },
  en: {
    meta: {
      home: {
        title: 'Nicolás Andrade — Software Engineer',
        description:
          'Full-stack Software Engineer based in Rosario, Argentina. I build B2B SaaS products end to end with React, TypeScript, Node.js and Go.',
      },
      experience: {
        title: 'Experience — Nicolás Andrade',
        description:
          "Nicolás Andrade's career: Teramot's 2.0 platform, freelance projects and education.",
      },
      projects: {
        title: 'Projects — Nicolás Andrade',
        description: 'Projects by Nicolás Andrade: web products built with React, TypeScript, Node.js and Go.',
      },
    },
    skip: 'Skip to content',
    nav: { about: 'Profile', experience: 'Experience', projects: 'Projects', stack: 'Stack', contact: 'Contact' },
    navLabel: 'Sections',
    menu: 'Menu',
    theme: 'Toggle theme',
    switchLang: 'Leer en español',
    hero: {
      tagline: 'I build B2B SaaS products end to end: from the React interface to the APIs in Node.js and Go.',
      downloadCv: 'Download CV',
      viewProjects: 'View projects',
      scroll: 'Scroll',
    },
    about: {
      title: 'Full stack, from the interface to the data.',
      body: "I work on Teramot's 2.0 platform, one of six startups selected for Endeavor's Scale Up program: interfaces in React and TypeScript, APIs in Go and Node.js, data in PostgreSQL.",
      now: 'Now',
      nowText: 'Building Teramot 2.0, front and back.',
    },
    experience: {
      title: 'Career',
      more: 'See the full history',
      pageTitle: 'Experience',
      pageLead: 'What I did at each place, unabridged.',
    },
    projects: {
      title: 'Selected projects',
      all: 'View all',
      featured: 'Featured',
      view: 'View project',
      pageTitle: 'Projects',
      pageLead: 'Products and tools I have built.',
      filterLabel: 'Filter by technology',
      filterAll: 'All',
      role: 'Role',
      year: 'Year',
      problem: 'Problem',
      solution: 'Solution',
      results: 'Results',
      gallery: 'Gallery',
      previous: 'Previous',
      next: 'Next',
      repo: 'Code',
      demo: 'Demo',
    },
    stack: { title: 'What I work with' },
    education: { title: 'Education' },
    contact: {
      title: "Let's talk.",
      lead: 'Reach me by email or LinkedIn.',
      copy: 'Copy email',
      copied: 'Copied',
    },
    palette: {
      open: 'Search',
      placeholder: 'Go to…',
      sections: 'Sections',
      pages: 'Pages',
      actions: 'Actions',
      empty: 'No results',
      home: 'Home',
    },
    footer: { top: 'Back to top' },
    notFound: { title: 'Page not found', body: 'This page does not exist.', home: 'Go home' },
  },
};
