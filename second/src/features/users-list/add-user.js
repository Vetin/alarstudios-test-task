import { createElement } from '../../libs/ui/create-element.js';
import { createState } from '../../libs/ui/create-state.js';
import { pipe } from '../../libs/pipe.js';
import { Input } from '../../ui/input.js';
import { alert } from '../alert.js';
import { validateUser } from './validators.js';
import { createComponent } from '../../libs/ui/create-component.js';

export const AddUser = ({ addUser, className = '' }) => {
  const [, nameUpdated, , getName] = createState('');
  const [, phoneUpdated, , getPhone] = createState('');

  const Name = createComponent(() =>
    Input({
      change: (e) => nameUpdated(e.target.value),
      value: '',
      placeholder: 'Имя',
    }),
  );

  const Phone = createComponent(() =>
    Input({
      change: (e) => phoneUpdated(e.target.value),
      value: '',
      placeholder: 'Телефон',
    }),
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: getName(),
      phone: getPhone(),
    };

    const { valid, errors } = validateUser(user);
    if (valid) {
      pipe(
        addUser,
        () => Name.rerender({ attrs: { value: '' } }),
        () => Phone.rerender((prev) => ({ ...prev, attrs: { ...prev.attrs, value: '' } })),
        () => phoneUpdated(''),
        () => nameUpdated(''),
      )(user);
    }
    Object.entries(errors).forEach(([_, message]) => alert({ message }));
  };

  return createElement({
    tag: 'form',
    attrs: { className },
    handlers: [{ type: 'submit', fn: handleSubmit }],
    children: [
      Name.current(),
      Phone.current(),
      createElement({
        tag: 'button',
        attrs: {
          textContent: 'Добавить',
          type: 'submit',
        },
      }),
    ],
  });
};
