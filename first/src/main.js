import { createColor } from './features/color/index.js';
import { createStars } from './features/stars/index.js';

const app = document.getElementById('app');

const bootstrap = () => {
  const color = createColor();
  const stars = createStars(color.fill);

  app.append(stars, color.element);
};

bootstrap();
