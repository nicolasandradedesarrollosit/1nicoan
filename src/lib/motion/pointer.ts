import { reducedMotion } from '../loader';

const TILT_DEG = 3;
const MAGNET = 0.3;

function relative(event: PointerEvent, el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y, nx: (x / rect.width) * 2 - 1, ny: (y / rect.height) * 2 - 1, rect };
}

function bind(selector: string, move: (el: HTMLElement, event: PointerEvent) => void, props: string[]) {
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    el.addEventListener('pointermove', (event) => move(el, event));
    el.addEventListener('pointerleave', () => props.forEach((prop) => el.style.removeProperty(prop)));
  });
}

export function initPointer() {
  if (reducedMotion() || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  bind(
    '[data-spotlight]',
    (el, event) => {
      const { x, y } = relative(event, el);
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
      el.style.setProperty('--spot', '1');
    },
    ['--spot'],
  );

  bind(
    '[data-tilt]',
    (el, event) => {
      const { nx, ny } = relative(event, el);
      el.style.setProperty('--rx', `${(-ny * TILT_DEG).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${(nx * TILT_DEG).toFixed(2)}deg`);
    },
    ['--rx', '--ry'],
  );

  bind(
    '[data-magnetic]',
    (el, event) => {
      const { nx, ny, rect } = relative(event, el);
      el.style.setProperty('--tx', `${((nx * rect.width) / 2) * MAGNET}px`);
      el.style.setProperty('--ty', `${((ny * rect.height) / 2) * MAGNET}px`);
    },
    ['--tx', '--ty'],
  );
}
