/** Client-side control of the page curtain (src/components/layout/PageLoader.astro). */
import { navigate } from 'astro:transitions/client';

/** Time for the monogram to finish drawing; keep in sync with `.loader` in index.css. */
const DRAW_MS = 750;
/** How long the curtain stays once the change behind it is done. */
const HOLD_MS = 350;

const root = document.documentElement;
/** True while a curtain navigation is in flight (the router swaps <html> attributes). */
let navigating = false;

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function hideLoader() {
  delete root.dataset.loading;
}

/** Raises the curtain, runs `action` once the monogram is drawn, then lifts it. */
export function withLoader(action: () => void) {
  if (reducedMotion()) return action();
  root.dataset.loading = 'out';
  setTimeout(() => {
    action();
    setTimeout(hideLoader, HOLD_MS);
  }, DRAW_MS);
}

/** Client-side navigation behind the curtain (used by the language switch). */
export function navigateWithLoader(href: string) {
  if (reducedMotion()) return void navigate(href);
  root.dataset.loading = 'out';
  setTimeout(() => {
    navigating = true;
    navigate(href);
  }, DRAW_MS);
}

// The curtain already hides the change: skip the router's cross-fade, which would
// make the monogram blink.
document.addEventListener('astro:before-swap', (event) => {
  if (navigating) event.viewTransition.skipTransition();
});
// The swap replaces <html> attributes: put the curtain back before the next paint.
document.addEventListener('astro:after-swap', () => {
  if (navigating) root.dataset.loading = 'in';
});
document.addEventListener('astro:page-load', () => {
  if (!navigating) return;
  navigating = false;
  setTimeout(hideLoader, HOLD_MS);
});
