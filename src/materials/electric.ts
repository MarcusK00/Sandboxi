import type { Grid } from "../world/grid";
import { CellType } from "../engine/types";


const FRAMES_PER_SECOND = 30;

export function updateElectric(grid: Grid, x: number, y: number) {
  const lifetime = grid.getMeta(x, y) - (1 / FRAMES_PER_SECOND);
  if (lifetime <= 0) {
    grid.set(x, y, CellType.Empty);
    grid.setMeta(x, y, 0);
    return;
  }
  grid.setMeta(x, y, lifetime);

  const nx = x + (Math.random() < 0.5 ? -1 : 1);
  const ny = y + (Math.random() < 0.5 ? -1 : 1);
  if (grid.inBounds(nx, ny)) grid.swap(x, y, nx, ny);

  if (y + 1 >= grid.height) return;

  switch (grid.get(x, y + 1)) {
    case CellType.Empty:
  
      break;
  }
}