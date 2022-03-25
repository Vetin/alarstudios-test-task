const shallowClone = (value) => {
  if (typeof value === 'object' && value !== null) {
    return Array.isArray(value) ? [...value] : { ...value };
  }
  return value;
};

export const createState = (value) => {
  let local = shallowClone(value);
  const subsribers = [];
  const subsribe = (fn) => subsribers.push(fn);

  const updater = (newValue) => {
    const prev = local;
    if (typeof newValue !== 'function') {
      local = newValue;
    } else {
      local = newValue(local);
    }
    subsribers.forEach((fn) => fn(local, prev));
  };

  return [local, updater, subsribe];
};
