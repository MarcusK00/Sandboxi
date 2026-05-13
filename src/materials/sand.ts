import type { Grid } from "../world/grid";
import { CellType } from "../engine/types";

export function updateSand(grid: Grid, x: number, y: number) {
  if (y + 1 >= grid.height) return;
if(Math.random()>0.7) return;
  switch (grid.get(x, y + 1)) {
    case CellType.Empty:
      grid.swap(x, y, x, y + 1);
      break;
    case CellType.Sand: {
      const dir = Math.random() < 0.5 ? -1 : 1;
      const nx = x + dir;
      if (grid.inBounds(nx, y + 1) && grid.get(nx, y + 1) === CellType.Empty) {
        grid.swap(x, y, nx, y + 1);
      }
      break;
    }
    case CellType.Water:
      if (Math.random() > 0.3) return;
      grid.swap(x, y, x, y + 1);
      break;

    
  }
}