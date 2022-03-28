import { createElement } from '../../libs/ui/create-element.js';

export const TableHeader = () =>
  createElement({
    tag: 'fragment',
    children: [
      createElement({
        tag: 'div',
        attrs: {
          textContent: 'Имя',
        },
      }),
      createElement({
        tag: 'div',
        attrs: {
          textContent: 'Телефон:',
        },
      }),
      createElement({
        tag: 'div',
        attrs: {
          textContent: 'Действия',
        },
      }),
    ],
  });
