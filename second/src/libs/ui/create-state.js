const shallowClone = (value) => {
  if (typeof value === 'object' && value !== null) {
    return Array.isArray(value) ? [...value] : { ...value };
  }
  return value;
};

export const createState = (value) => {
  const local = { value: shallowClone(value) };
  const subsribers = [];

  const subsribe = (fn) => subsribers.push(fn);

  function getState() {
    return local.value;
  }

  const updater = (newValue) => {
    const prev = local.value;

    if (typeof newValue !== 'function') {
      local.value = newValue;
    } else {
      local.value = newValue(prev);
    }

    subsribers.forEach((fn) => fn(local.value, prev));
  };

  return [local.value, updater, subsribe, getState];
};
