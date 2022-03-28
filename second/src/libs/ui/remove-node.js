import { RENDER_IDENTIFIER } from './constants.js';

export const removeNode = (identifier) => {
  const node = document.querySelector(`[data-${RENDER_IDENTIFIER}="${identifier}"]`);
  if (!node) {
    return null;
  }
  node.remove();
};
