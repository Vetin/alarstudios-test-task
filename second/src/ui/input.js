import { createElement } from '../libs/create-element';

export const input = ({ value, change, error, focus, placeholder, className }) =>
  createElement({
    tag: 'div',
    children: [
      createElement({
        tag: 'input',
        attrs: {
          value,
          placeholder,
          className,
        },
        handlers: [
          change && {
            type: 'change',
            fn: change,
          },
          focus && {
            type: 'focus',
            fn: focus,
          },
        ],
      }),
      error &&
        createElement({
          tag: 'p',
          attrs: { textContent: error },
        }),
    ],
  });
