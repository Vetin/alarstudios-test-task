import { RENDER_IDENTIFIER } from './constants.js';

/**
 *
 * @param {{tag: HTMLElementTagNameMap | null, handlers: {type: string, fn: EventListenerOrEventListenerObject}[], children: Node[], attrs: Record<string, any>, key?: string}} payload
 */
export const createElement = (payload) => {
  const { tag, handlers, attrs, children, key } = payload;

  if (!tag) return document.createComment(text);
  const element =
    tag === 'fragment' ? document.createDocumentFragment() : document.createElement(tag);

  if (handlers?.length > 0) handlers.forEach(({ type, fn }) => element.addEventListener(type, fn));

  if (attrs) Object.entries(attrs).forEach(([prop, value]) => (element[prop] = value));

  if (children) children.forEach((child) => element.append(child));
  if (key) element.dataset[RENDER_IDENTIFIER] = key;

  return element;
};
