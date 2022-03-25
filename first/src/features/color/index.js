import { createCanvas } from '../../libs/create-canvas.js';

const WIDTH = 600;
const HEIGHT = 50;

/**
 * @return {{element: HTMLCanvasElement, fill: (color: string) => void}}
 */
export const createColor = () => {
  const cvs = createCanvas({ width: WIDTH, height: HEIGHT });
  const ctx = cvs.getContext('2d');

  const fill = (color) => {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 600, 50);
  };

  return {
    element: cvs,
    fill,
  };
};
