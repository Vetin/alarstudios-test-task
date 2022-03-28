import { createElement } from '../libs/ui/create-element.js';

export const Input = ({ value, change, focus, placeholder, className = '', identifier }) =>
  createElement({
    tag: 'div',
    identifier,
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
            type: 'input',
            fn: change,
          },
          focus && {
            type: 'focus',
            fn: focus,
          },
        ].filter(Boolean),
      }),
    ],
  });
