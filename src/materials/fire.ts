import type { Grid } from "../world/grid";
import { CellType } from "../engine/types";

export function updateFire(grid: Grid, x: number, y: number) {
  if (y + 1 >= grid.height) return;

  switch (grid.get(x, y + 1)) {
    case CellType.Empty:
      
      break;
    case CellType.Sand: {
      
      break;
    }
    case CellType.Water:
     
      break;
  }
}