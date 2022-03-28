export const createComponent = (element) => {
  const node = {};

  if (typeof element === 'function') {
    let prevArgs = {};
    let renderedNode = null;
    const render = (arg = {}) => {
      prevArgs = arg;
      renderedNode = element({ ...arg });
      return renderedNode;
    };

    const rerender = (newArgs = {}) => {
      const args = typeof newArgs === 'function' ? newArgs(prevArgs) : newArgs;
      const newNode = element({ ...prevArgs, ...args });
      const parent = renderedNode.parentNode;

      const posToAdd = document.createComment('');
      parent.insertBefore(posToAdd, renderedNode);
      renderedNode.remove();
      parent.insertBefore(newNode, posToAdd);
      posToAdd.remove();
      renderedNode = newNode;
    };
    node.current = render;
    node.rerender = rerender;
  } else {
    node.current = element;
  }

  return node;
};
