import { RENDER_IDENTIFIER } from './constants.js';

export const replaceNode = (identifier, newNode) => {
  const node = document.querySelector(`[data-${RENDER_IDENTIFIER}="${identifier}"]`);
  if (!node) {
    return null;
  }
  node.replaceWith(newNode);
};
