export const checkPointInsidePolygon = (polygon: number[][], point: number[]) => {
  if (!polygon || polygon.length < 3) return;

  const x = point[1];
  const y = point[0];
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][1],
      yi = polygon[i][0];
    const xj = polygon[j][1],
      yj = polygon[j][0];

    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
};
