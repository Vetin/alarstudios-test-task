export const pipe =
  (...fns) =>
  (payload) =>
    fns.reduce((acc, fn) => fn(acc), payload);
