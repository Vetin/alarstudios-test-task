const HEAD_SIDES = { x: 20, y: 50 };
const TOP_SIDES = { x: 65, y: HEAD_SIDES.y };
const MIDDLE_SIDES = { x: 32.5, y: 80 };
const DOWN_SIZES = { x: 50, y: 125 };

/**
 * @param {{ startPosition: {x: number, y: number} }} payload
 * @return {Path2D}
 */
export const createStarPath = (payload) => {
  const { startPosition } = payload;

  const star = new Path2D();

  const lineTo = (x = 0, y = 0) => star.lineTo(startPosition.x + x, startPosition.y + y);

  lineTo();
  lineTo(-HEAD_SIDES.x, HEAD_SIDES.y);
  lineTo(-TOP_SIDES.x, TOP_SIDES.y);
  lineTo(-MIDDLE_SIDES.x, MIDDLE_SIDES.y);
  lineTo(-DOWN_SIZES.x, DOWN_SIZES.y);
  lineTo(0, 100);
  lineTo(DOWN_SIZES.x, DOWN_SIZES.y);
  lineTo(MIDDLE_SIDES.x, MIDDLE_SIDES.y);
  lineTo(TOP_SIDES.x, TOP_SIDES.y);
  lineTo(HEAD_SIDES.x, HEAD_SIDES.y);

  return star;
};
