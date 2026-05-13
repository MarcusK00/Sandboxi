import type { Grid } from "../world/grid";
import { CellType } from "../engine/types";


const FRAMES_PER_SECOND = 60;

export function updateGlitch(grid: Grid, x: number, y: number) {
  const lifetime = grid.getMeta(x, y) - (1 / FRAMES_PER_SECOND);
  if (lifetime <= 0) {
    grid.set(x, y, CellType.Empty);
    grid.setMeta(x, y, 0);
    return;
  }
  grid.setMeta(x, y, lifetime);

  if (y + 1 >= grid.height) return;

  const nx = x + (Math.random() < 0.5 ? -1 : 1);
  if (grid.inBounds(nx, y)) grid.swap(x, y, nx, y);

  switch (grid.get(x, y + 1)) {
    case CellType.Empty:
      grid.swap(x, y, x, y + 1);
      break;
  }
}