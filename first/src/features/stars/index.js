import { createCanvas } from '../../libs/create-canvas.js';
import { createStarPath } from './create-star-path.js';

const STARS_COLORS = ['red', 'blue', 'green', 'yellow', 'black'];

const X_GAP = 300;
const Y_GAP = 200;

const START_X = 100;
const START_Y = 50;

/**
 *
 * @param {(color: string) => void} onStarClick
 * @returns {HTMLCanvasElement}
 */
export const createStars = (onStarClick) => {
  const cvs = createCanvas({ width: 600, height: 600 });
  const ctx = cvs.getContext('2d');

  /** @type {{path: Path2D, color: string}} */
  const stars = STARS_COLORS.map((color, idx) => {
    const path = createStarPath({
      color,
      ctx,
      startPosition: {
        x: idx % 2 ? START_X + X_GAP : START_X,
        y: START_Y + Y_GAP * Math.round(idx / 2),
      },
    });
    ctx.fillStyle = color;
    ctx.fill(path);

    return { path, color };
  });

  cvs.addEventListener('click', (e) => {
    const cvsPos = cvs.getBoundingClientRect();
    const x = e.x - cvsPos.x;
    const y = e.y - cvsPos.y;

    for (const star of stars) {
      if (ctx.isPointInPath(star.path, x, y)) {
        onStarClick(star.color);
        return;
      }
    }

    onStarClick('white');
  });

  return cvs;
};
