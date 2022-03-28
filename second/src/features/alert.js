const ALERT_WRAPPER_ID = 'ALERT_WRAPPER';

const getWrapper = () => {
  const wrapperNode = document.getElementById(ALERT_WRAPPER_ID);
  if (wrapperNode) return wrapperNode;

  const wrapper = document.createElement('div');
  wrapper.className = 'alert-wrapper';
  wrapper.id = ALERT_WRAPPER_ID;

  document.body.append(wrapper);
  return wrapper;
};
/**
 * @param {{message: string;duration?: number;}} cfg
 */
export const alert = (cfg) => {
  const { message, duration = 6000 } = cfg;
  const wrapper = getWrapper();

  const alert = document.createElement('div');
  alert.className = 'alert';
  const text = document.createElement('p');
  text.className = 'alert__text';
  text.textContent = message;

  alert.append(text);

  const clean = () => cleanUp({ alert, wrapper });

  const timeoutId = setTimeout(clean, duration);

  alert.addEventListener('click', () => {
    clearTimeout(timeoutId);
    clean();
  });

  wrapper.append(alert);
};

const cleanUp = ({ alert, wrapper }) => {
  alert.classList.add('alert-remove');
  alert.addEventListener('transitionend', () => {
    alert.remove();
    if (wrapper.children.length === 0) wrapper?.remove();
  });
};
