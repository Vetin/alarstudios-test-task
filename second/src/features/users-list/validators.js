export const validateName = (name) => Boolean(name.trim());
export const NAME_ERROR_MESSAGE = 'Имя не может быть пустым';

export const validatePhone = (phone) => {
  const trimmedPhone = phone.trim();
  if (!trimmedPhone) return false;
  const preparedValue = trimmedPhone.startsWith('+') ? trimmedPhone.substr(1) : trimmedPhone;
  const isValidSymb = (symb) => symb !== ' ' && (symb === '-' || Number.isInteger(+symb));

  return preparedValue.split('').every(isValidSymb);
};

export const PHONE_ERROR_MESSAGE = 'Телефон должен состоять только из цифр и тире';

const MESSAGE_BY_PROP = {
  name: NAME_ERROR_MESSAGE,
  phone: PHONE_ERROR_MESSAGE,
};

const VALIDATOR_BY_PROP = {
  name: validateName,
  phone: validatePhone,
};

export const validateUser = (user) =>
  Object.entries(user).reduce(
    (acc, [key, value]) => {
      const validator = VALIDATOR_BY_PROP[key];
      if (validator && !validator(value)) {
        acc.valid = false;
        acc.errors[key] = MESSAGE_BY_PROP[key];
      }
      return acc;
    },
    { valid: true, errors: {} },
  );
