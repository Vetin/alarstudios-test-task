import { RENDER_IDENTIFIER } from './constants.js';

export const replaceNode = (identifier, newNode) => {
  const node = document.querySelector(`[data-${RENDER_IDENTIFIER}=${identifier}]`);
  if (!node) {
    console.warn('Node with identifier %s, was not found', identifier);
    return null;
  }
  node.replaceWith(newNode);
};
