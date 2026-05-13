import type { Grid } from "../world/grid";
import { CellType } from "../engine/types";

const SPREAD = 2;

export function updateOil(grid: Grid, x: number, y: number) {
  if (y + 1 >= grid.height) return;
  if (Math.random() > 0.8) return;

  switch (grid.get(x, y + 1)) {
    case CellType.Empty:
      grid.swap(x, y, x, y + 1);
      break;

    case CellType.Water: {

  if (Math.random() < 0.001) {
    grid.swap(x, y, x, y + 1);
    break;
  }


  const dir = Math.random() < 0.5 ? -1 : 1;
  const nx = x + dir;

  if (grid.inBounds(nx, y) && grid.get(nx, y) === CellType.Water) {
    if (Math.random() < 0.2) {
      grid.swap(x, y, nx, y);
    }
  } else if (grid.inBounds(nx, y) && grid.get(nx, y) === CellType.Empty) {
    if (Math.random() < 0.2) {
      grid.swap(x, y, nx, y);
    }
  }
  break;
}

    default: {
      const dir = Math.random() < 0.5 ? -1 : 1;
      const diagA = x + dir;
      const diagB = x - dir;

      const diagOptions: number[] = [];
      if (
        grid.inBounds(diagA, y + 1) &&
        grid.get(diagA, y) === CellType.Empty &&
        grid.get(diagA, y + 1) === CellType.Empty
      ) {
        diagOptions.push(diagA);
      }
      if (
        grid.inBounds(diagB, y + 1) &&
        grid.get(diagB, y) === CellType.Empty &&
        grid.get(diagB, y + 1) === CellType.Empty
      ) {
        diagOptions.push(diagB);
      }

      if (diagOptions.length > 0) {
        const choice = diagOptions[Math.floor(Math.random() * diagOptions.length)];
        grid.swap(x, y, choice, y + 1);
        break;
      }

      for (let i = 1; i <= SPREAD; i++) {
        const rx = x + dir * i;
        const lx = x - dir * i;

        const rOpen = grid.inBounds(rx, y) && grid.get(rx, y) === CellType.Empty;
        const lOpen = grid.inBounds(lx, y) && grid.get(lx, y) === CellType.Empty;

        if (rOpen && lOpen) {
          const choice = Math.random() <= 0.5 ? rx : lx;
          grid.swap(x, y, choice, y);
          break;
        }
        if (rOpen) {
          grid.swap(x, y, rx, y);
          break;
        }
        if (lOpen) {
          grid.swap(x, y, lx, y);
          break;
        }
        if (!rOpen && !lOpen) break;
      }
      break;
    }
  }
}