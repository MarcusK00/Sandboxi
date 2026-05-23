import type { Grid } from "../world/grid";
import { CellType } from "../engine/types";

const SPREAD = 4;

export function updateWater(grid: Grid, x: number, y: number) {
  if (y + 1 >= grid.height) return;
  if (Math.random() > 0.6) return;

  switch (grid.get(x, y + 1)) {
    case CellType.Empty:
      grid.swap(x, y, x, y + 1);
      break;

    case CellType.Ice:
      grid.swap(x, y, x, y + 1);
      break;

    case CellType.Sand:
      if (Math.random() > 0.9) {
        grid.set(x, y + 1, CellType.Mud);
        grid.set(x, y, CellType.Empty);
      }
      break;

    case CellType.Mud:
      let i = 1;

      while (grid.get(x, y + i) === CellType.Mud) {
        i++;
      }
      if (Math.random() > 0.95 && grid.get(x, y + i) === CellType.Sand) {

        grid.set(x, y + i, CellType.Mud);
        grid.set(x, y, CellType.Empty);
      }

      break;


    default: {
      const dir = Math.random() < 0.5 ? -1 : 1;
      const diagA = x + dir;
      const diagB = x - dir;

      if (grid.inBounds(diagA, y + 1) && grid.get(diagA, y) === CellType.Empty && grid.get(diagA, y + 1) === CellType.Empty) {
        grid.swap(x, y, diagA, y + 1);
        break;
      }
      if (grid.inBounds(diagB, y + 1) && grid.get(diagB, y) === CellType.Empty && grid.get(diagB, y + 1) === CellType.Empty) {
        grid.swap(x, y, diagB, y + 1);
        break;
      }

      for (let i = 1; i <= SPREAD; i++) {
        const rx = x + (dir * i);
        const lx = x - (dir * i);
        const rOpen = grid.inBounds(rx, y) && grid.get(rx, y) === CellType.Empty;
        const lOpen = grid.inBounds(lx, y) && grid.get(lx, y) === CellType.Empty;

        if (rOpen) { grid.swap(x, y, rx, y); break; }
        if (lOpen) { grid.swap(x, y, lx, y); break; }
        if (!rOpen && !lOpen) break;
      }
      break;
    }
  }
}