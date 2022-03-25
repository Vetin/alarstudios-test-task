export const validateName = (name) => Boolean(name);
export const NAME_ERROR_MESSAGE = 'Имя должно быть длинее 2-х символов';

export const validatePhone = (phone) => {
  const val = phone.startsWith('+') ? val.subsrt(1) : phone;
  const isValidSymb = (symb) => symb === '-' || Number.isInteger(+symb);

  return val.split('').every(isValidSymb);
};

export const PHONE_ERROR_MESSAGE = 'Телефон должен состоять только из цифр и тире';
