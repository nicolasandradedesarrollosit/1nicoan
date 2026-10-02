import { navigate } from 'astro:transitions/client';

const COVER_MS = 450;
const HOLD_MS = 350;

const root = document.documentElement;
let navigating = false;

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function hideLoader() {
  delete root.dataset.loading;
}

export function withLoader(action: () => void) {
  if (reducedMotion()) return action();
  root.dataset.loading = 'out';
  setTimeout(() => {
    action();
    setTimeout(hideLoader, HOLD_MS);
  }, COVER_MS);
}

export function navigateWithLoader(href: string) {
  if (reducedMotion()) return void navigate(href);
  root.dataset.loading = 'out';
  setTimeout(() => {
    navigating = true;
    navigate(href);
  }, COVER_MS);
}

document.addEventListener('astro:before-swap', (event) => {
  if (navigating) event.viewTransition.skipTransition();
});
document.addEventListener('astro:after-swap', () => {
  if (navigating) root.dataset.loading = 'in';
});
document.addEventListener('astro:page-load', () => {
  if (!navigating) return;
  navigating = false;
  setTimeout(hideLoader, HOLD_MS);
});
