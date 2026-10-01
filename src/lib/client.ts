/**
 * Client entry point, loaded once from BaseLayout. The router swaps the page without
 * reloading, so clicks are handled by delegation on `document` and everything that
 * touches specific elements is re-run on `astro:page-load`.
 */
import { navigateWithLoader, withLoader } from './loader';
import { initPointer } from './motion/pointer';
import { initScroll } from './motion/scroll';
import { initPalette, openPalette } from './palette';
import { initDurations } from './period';

const root = document.documentElement;

function toggleTheme() {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  withLoader(() => {
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage unavailable: the choice just lasts for this page view.
    }
  });
}

async function copy(button: HTMLElement) {
  try {
    await navigator.clipboard.writeText(button.dataset.copy ?? '');
  } catch {
    return;
  }
  const label = button.querySelector('[data-copy-label]');
  if (!label || !button.dataset.copiedLabel) return;
  const idle = label.textContent;
  label.textContent = button.dataset.copiedLabel;
  setTimeout(() => (label.textContent = idle), 2000);
}

function toggleMenu(button: HTMLElement) {
  const menu = document.getElementById(button.getAttribute('aria-controls') ?? '');
  if (!menu) return;
  menu.hidden = !menu.hidden;
  button.setAttribute('aria-expanded', String(!menu.hidden));
}

/** Projects page: shows only the cards whose stack includes the chosen technology. */
function filterProjects(button: HTMLElement) {
  const value = button.dataset.filter ?? '';
  document.querySelectorAll<HTMLElement>('[data-filter]').forEach((el) => {
    el.setAttribute('aria-pressed', String(el === button));
  });
  document.querySelectorAll<HTMLElement>('[data-stack]').forEach((card) => {
    card.hidden = value !== '' && !(card.dataset.stack ?? '').split('|').includes(value);
  });
}

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const hit = (selector: string) => target.closest<HTMLElement>(selector);
  let el: HTMLElement | null;

  if (hit('[data-theme-toggle]')) toggleTheme();
  else if ((el = hit('[data-copy]'))) copy(el);
  else if ((el = hit('[data-menu-toggle]'))) toggleMenu(el);
  else if (hit('[data-palette-open]')) openPalette();
  else if ((el = hit('[data-filter]'))) filterProjects(el);
  else if ((el = hit('a[data-lang-switch]'))) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigateWithLoader((el as HTMLAnchorElement).href);
  }
});

document.addEventListener('astro:page-load', () => {
  initScroll();
  initPointer();
  initPalette();
  initDurations();
});
