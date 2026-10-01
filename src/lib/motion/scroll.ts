/** Scroll-linked behaviour: reveals, count-up numbers and the header scroll-spy. */
import { reducedMotion } from '../loader';

const STAGGER_MS = 80;
let observers: IntersectionObserver[] = [];

/** Counts from 0 to `data-count`, keeping any prefix/suffix around the number. */
function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const template = el.dataset.template ?? '{n}';
  const start = performance.now();
  const duration = 1400;
  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = template.replace('{n}', String(Math.round(target * eased)));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function initReveal() {
  const targets = new Set<HTMLElement>(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  // Children of a [data-stagger] container reveal one after another.
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      const el = child as HTMLElement;
      el.style.transitionDelay = `${i * STAGGER_MS}ms`;
      targets.add(el);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add('is-visible');
        el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);
        observer.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  targets.forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });
  observers.push(observer);
}

/** Marks the header link of the section currently in view (home page only). */
function initScrollSpy() {
  const sections = document.querySelectorAll<HTMLElement>('[data-section]');
  const links = document.querySelectorAll<HTMLElement>('[data-spy]');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((link) => {
          if (link.dataset.spy === entry.target.id) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      }
    },
    // A thin band around the middle of the viewport decides the active section.
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((section) => observer.observe(section));
  observers.push(observer);
}

export function initScroll() {
  observers.forEach((observer) => observer.disconnect());
  observers = [];
  initScrollSpy();
  if (!reducedMotion() && 'IntersectionObserver' in window) initReveal();
}
