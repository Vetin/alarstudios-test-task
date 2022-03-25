/**
 * @param {{ width: number, height: number }} payload
 * @return { HTMLCanvasElement }
 * */
export const createCanvas = (payload) => {
  const { width, height } = payload;

  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  return canvas;
};
