import { RENDER_IDENTIFIER } from './constants.js';
import { randomId } from '../random-id.js';
import { replaceNode } from './replace-node.js';
import { removeNode } from './remove-node.js';

export const createElement = (payload) => {
  const { tag, handlers = [], attrs = {}, children, identifier = '' } = payload;

  if (!tag) return document.createComment(attrs.textContent || '');
  const element = tag === 'fragment' ? new DocumentFragment() : document.createElement(tag);

  const id = identifier || randomId();

  element.identifier = id;

  element.add = (...nodes) => {
    const fn = element.append.bind(element);
    nodes.forEach((node) => {
      if (isFragment(node)) {
        const comment = document.createComment(`Fragment ${node.identifier}`);
        fn(comment);
      }
      fn(node);
    });
  };

  element.replace = (node) => {
    element.replaceWith(node.cloneNode(true));
    return node;
  };

  if (isFragment(element)) {
    const prevAdd = element.add;

    let fragmentNodes = [];

    element.add = (...node) => {
      fragmentNodes.push(...node);
      prevAdd.bind(element)(...node);
    };
    element.replace = (node) => {
      const commentFinder = document.createNodeIterator(document.body, NodeFilter.SHOW_COMMENT);

      let insertTarget;
      while (commentFinder.nextNode()) {
        if (commentFinder.referenceNode.textContent === createCommentText(element.identifier)) {
          insertTarget = commentFinder.referenceNode;
          break;
        }
      }

      if (fragmentNodes.length !== 0) {
        for (const child of fragmentNodes) {
          // prefer remove by identifier for handling case where node was recreated
          if (child.identifier) {
            removeNode(child.identifier);
          } else {
            child.remove();
          }
        }
        fragmentNodes = [];
      }

      const add = (child) => {
        if (insertTarget) {
          insertTarget.parentNode.insertBefore(child, insertTarget);
        } else {
          element.add(child);
        }
        fragmentNodes.push(child);
      };

      if (isFragment(node)) {
        Array.from(node.children).forEach(add);
      }

      return element;
    };
  }
  if (handlers?.length > 0) handlers.forEach(({ type, fn }) => element.addEventListener(type, fn));

  if (attrs) Object.entries(attrs).forEach(([prop, value]) => (element[prop] = value));

  if (children) children.forEach((child) => element.add(child));

  if (id && tag !== 'fragment') element.dataset[RENDER_IDENTIFIER] = id;

  return element;
};

new DocumentFragment().nodeName;

const isFragment = (node) => node?.nodeName === '#document-fragment';

const createCommentText = (id) => `Fragment ${id}`;
