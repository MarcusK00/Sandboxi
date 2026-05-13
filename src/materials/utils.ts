import type { Grid } from "../world/grid";

export function getBelow(grid: Grid, x: number, y: number) {
  if (y + 1 >= grid.height) return null;
  return grid.get(x, y + 1);
}