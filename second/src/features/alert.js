const ALERT_ID = 'ALERT_ID';

export const errorAlert = (cfg) => {
  const { message, duration = 6000 } = cfg;
  cleanUp();

  const alert = document.createElement('div');
  const text = document.createElement('p');
  text.textContent = message;
  alert.append(text);
  alert.id = ALERT_ID;

  alert.addEventListener('click', cleanUp);

  setTimeout(cleanUp, duration);

  document.body.append(alert);
};

const cleanUp = () => document.getElementById(ALERT_ID)?.remove();
