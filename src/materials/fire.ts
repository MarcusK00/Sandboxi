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


  const heatFuse = (tx: number, ty: number) => {
    if (!grid.inBounds(tx, ty)) return;

    if (grid.get(tx, ty) === CellType.Fuse) {
      const heat = grid.getMeta(tx, ty) + 0.03;
      grid.setMeta(tx, ty, heat);

      if (heat > 0.6 && Math.random() < 0.2) {
        grid.set(tx, ty, CellType.Fire);
        grid.setMeta(tx, ty, 2);
      }
    }
  };

  heatFuse(x + 1, y);
  heatFuse(x - 1, y);
  heatFuse(x, y + 1);
  heatFuse(x, y - 1);


  if (Math.random() > 0.6) return;

  const dirs = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  const [dx, dy] = dirs[Math.floor(Math.random() * dirs.length)];

  const nx = x + dx;
  const ny = y + dy;

  if (!grid.inBounds(nx, ny)) return;

  const target = grid.get(nx, ny);

  switch (target) {
    case CellType.Empty:
      grid.swap(x, y, nx, ny);
      break;

    case CellType.Oil:
      if (Math.random() > 0.9) return;
      grid.set(nx, ny, CellType.Fire);
      grid.setMeta(nx, ny, 0.6);
      break;

    case CellType.Fuse:

      if (Math.random() < 0.1) {
        grid.set(nx, ny, CellType.Fire);
        grid.setMeta(nx, ny, 2);
      }
      break;
  }
}