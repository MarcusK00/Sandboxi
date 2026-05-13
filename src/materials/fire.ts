import type { Grid } from "../world/grid";
import { CellType } from "../engine/types";

const FRAMES_PER_SECOND = 30;

export function updateFire(grid: Grid, x: number, y: number) {
const lifetime = grid.getMeta(x, y) - (1 / FRAMES_PER_SECOND);

  if (lifetime <= 0) {
    grid.set(x, y, CellType.Empty);
    grid.setMeta(x, y, 0);
    return;
  }

  grid.setMeta(x, y, lifetime);

  if (Math.random() > 0.3) return;

  const n = Math.random()<0.3?-1:0;

  const dirs = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  const [dx, dy] = dirs[Math.floor(Math.random() * dirs.length)];

  const nx = x + dx;
  const ny = y + dy+n;

  if (!grid.inBounds(nx, ny)) return;

  const target = grid.get(nx, ny);

  switch (target) {
    case CellType.Empty:
      grid.swap(x, y, nx, ny);
      break;
    
case CellType.Oil: {
   if (Math.random() > 0.9) return;
  grid.set(nx, ny, CellType.Fire);
  grid.setMeta(nx, ny, 0.6); 
  break;
}
}}