export const render = async (fn, target) => {
  const possibleNode = fn();

  const node = possibleNode instanceof Promise ? await possibleNode : possibleNode;

  target.append(node);
};
