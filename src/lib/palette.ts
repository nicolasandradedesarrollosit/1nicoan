/**
 * Command palette (src/components/ui/CommandPalette.astro). Items are plain links and
 * buttons carrying the same data attributes as the rest of the UI, so activating one
 * just clicks it; this module only handles opening, filtering and keyboard selection.
 */

const dialog = () => document.querySelector<HTMLDialogElement>('[data-palette]');

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

function visibleItems(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>('[data-palette-item]')).filter((item) => !item.hidden);
}

function select(root: HTMLElement, item: HTMLElement | undefined) {
  root.querySelectorAll('[data-selected]').forEach((el) => el.removeAttribute('data-selected'));
  if (!item) return;
  item.setAttribute('data-selected', '');
  item.scrollIntoView({ block: 'nearest' });
}

function filter(root: HTMLElement, query: string) {
  const q = normalize(query.trim());
  root.querySelectorAll<HTMLElement>('[data-palette-item]').forEach((item) => {
    item.hidden = !normalize(item.textContent ?? '').includes(q);
  });
  root.querySelectorAll<HTMLElement>('[data-palette-group]').forEach((group) => {
    group.hidden = !group.querySelector('[data-palette-item]:not([hidden])');
  });
  const items = visibleItems(root);
  const empty = root.querySelector<HTMLElement>('[data-palette-empty]');
  if (empty) empty.hidden = items.length > 0;
  select(root, items[0]);
}

export function openPalette() {
  const root = dialog();
  if (!root || root.open) return;
  const input = root.querySelector<HTMLInputElement>('input');
  root.showModal();
  if (input) input.value = '';
  filter(root, '');
  input?.focus();
}

/** Wires the dialog rendered on the current page. */
export function initPalette() {
  const root = dialog();
  if (!root) return;

  root.querySelector('input')?.addEventListener('input', (event) => {
    filter(root, (event.target as HTMLInputElement).value);
  });

  root.addEventListener('keydown', (event) => {
    const items = visibleItems(root);
    const current = items.findIndex((item) => item.hasAttribute('data-selected'));
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      select(root, items[(current + step + items.length) % items.length]);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      items[current]?.click();
    }
  });

  root.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    // Close on backdrop click and after choosing an item.
    if (target === root || target.closest('[data-palette-item]')) root.close();
  });
}

// Cmd/Ctrl + K toggles the palette from anywhere.
document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() !== 'k' || !(event.metaKey || event.ctrlKey)) return;
  event.preventDefault();
  const root = dialog();
  if (root?.open) root.close();
  else openPalette();
});
