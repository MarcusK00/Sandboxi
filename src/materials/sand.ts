import type { Grid } from "../world/grid";
import { CellType } from "../engine/types";

export function updateSand(grid: Grid, x: number, y: number) {
  if (y + 1 >= grid.height) return;

  const below = grid.get(x, y + 1);


  if (below === CellType.Empty) {
    if (Math.random() > 0.7) return;
    grid.swap(x, y, x, y + 1);
    return;
  }


  if (below === CellType.Water) {

    if (Math.random() > 0.15) return;

    grid.set(x, y + 1, CellType.Mud);
    grid.set(x, y, CellType.Empty);
    return;
  }


  if (below === CellType.Sand) {
    const dir = Math.random() < 0.5 ? -1 : 1;
    const nx = x + dir;

    if (grid.inBounds(nx, y + 1) && grid.get(nx, y + 1) === CellType.Empty) {
      grid.swap(x, y, nx, y + 1);
    }
    return;
  }

  const dir = Math.random() < 0.5 ? -1 : 1;
  const left = x - dir;
  const right = x + dir;

  if (grid.inBounds(left, y + 1) && grid.get(left, y + 1) === CellType.Empty) {
    grid.swap(x, y, left, y + 1);
    return;
  }

  if (grid.inBounds(right, y + 1) && grid.get(right, y + 1) === CellType.Empty) {
    grid.swap(x, y, right, y + 1);
    return;
  }
}