import { createElement } from '../../libs/create-element.js';
import { createState } from '../../libs/create-state.js';
import { input } from '../../ui/input.js';
import {
  NAME_ERROR_MESSAGE,
  PHONE_ERROR_MESSAGE,
  validateName,
  validatePhone,
} from './validators.js';

export const addUser = ({ addUser }) => {
  const [name, updateName, subsribeName] = createState('');
  const [phone, phoneName, subsribePhone] = createState('');
  const [errors, setErrors, subsribeErrors] = createState({ name: '', phone: '' });
  const renderRefs = {
    name: null,
    phone: null,
  };
  const onSubmit = () => {
    const form = { name, phone };
    const isNameValid = validateName(name);
    const isPhoneValid = validatePhone(phone);

    if (!isNameValid) setErrors((errors) => ({ ...errors, name: NAME_ERROR_MESSAGE }));
    if (!isPhoneValid) setErrors((errors) => ({ ...errors, phone: PHONE_ERROR_MESSAGE }));
    if (!isNameValid || !isPhoneValid) return;

    addUser(form);
  };

  const createNameInput = (name) =>
    input({
      value: name,
      change: (e) => updateName(e.target.value),
      error: errors.name,
      focus: () => (errors.name ? setErrors((errors) => ({ ...errors, name: '' })) : null),
      placeholder: 'Имя',
    });

  const nameInput = createNameInput(name);

  renderRefs.name = nameInput;

  const rerenderName = (name) => {
    const node = createNameInput(name);
    renderRefs.name.replaceWith(node);
    renderRefs.name = node;
  };

  subsribeName(rerenderName);

  const createPhoneInput = (phone) =>
    input({
      value: phone,
      change: (e) => updateName(e.target.value),
      error: errors.phone,
      focus: () => (errors.phone ? setErrors((errors) => ({ ...errors, phone: '' })) : null),
      placeholder: 'Телефон',
    });

  const phoneInput = createPhoneInput(phone);
  renderRefs.phone = phoneInput;

  const rerenderPhone = (phone) => {
    const node = createPhoneInput(phone);
    renderRefs.phone.replaceWith(node);
    renderRefs.phone = node;
  };

  subsribePhone(rerenderPhone);

  subsribeErrors((errors, prevErrors) => {
    if (prevErrors.name !== errors.name) rerenderName(name);
    if (prevErrors.phone !== errors.phone) rerenderPhone(phone);
  });

  return createElement({
    tag: 'div',
    attrs: {
      className: 'users-list__row',
    },
    children: [
      renderRefs.name,
      renderRefs.phone,
      createElement({
        tag: 'button',
        attrs: {
          textContent: 'string',
        },
        handlers: [{ type: 'click', fn: onSubmit }],
      }),
    ],
  });
};
