import type { Grid } from "../world/grid";
import { CellType } from "../engine/types";

export function updateSand(grid: Grid, x: number, y: number) {
  if (y + 1 >= grid.height) return;

  switch (grid.get(x, y + 1)) {
    case CellType.Empty: {
      if (Math.random() > 0.7) return;
      grid.swap(x, y, x, y + 1);
      break;
    }
    case CellType.Water: {
      if (Math.random() > 0.15) return;
      grid.set(x, y + 1, CellType.Mud);
      grid.set(x, y, CellType.Empty);
      break;
    }
    case CellType.Sand: {
      const dir = Math.random() < 0.5 ? -1 : 1;
      const nx = x + dir;
      if (grid.inBounds(nx, y + 1) && grid.get(nx, y + 1) === CellType.Empty) {
        grid.swap(x, y, nx, y + 1);
      }
      break;
    }
    default: {
      const dir = Math.random() < 0.5 ? -1 : 1;
      const left = x - dir;
      const right = x + dir;
      if (grid.inBounds(left, y + 1) && grid.get(left, y + 1) === CellType.Empty) {
        grid.swap(x, y, left, y + 1);
        break;
      }
      if (grid.inBounds(right, y + 1) && grid.get(right, y + 1) === CellType.Empty) {
        grid.swap(x, y, right, y + 1);
        break;
      }
      break;
    }
  }
}