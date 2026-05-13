import type { Grid } from "../world/grid";
import { CellType } from "../engine/types";

const FRAMES_PER_SECOND = 30;

export function updateElectric(grid: Grid, x: number, y: number) {

  // lifetime
  const lifetime = grid.getMeta(x, y) - (1 / FRAMES_PER_SECOND);

  if (lifetime <= 0) {
    grid.set(x, y, CellType.Empty);
    grid.setMeta(x, y, 0);
    return;
  }

  grid.setMeta(x, y, lifetime);

  // flicker chance
  if (Math.random() > 0.7) return;

  // random direction
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

    // move through air
    case CellType.Empty:
      grid.swap(x, y, nx, ny);
      break;

    // conduct through metal
    case CellType.Metal:

      // create new electricity INSIDE metal
      if (Math.random() < 0.4) {

        // pick another nearby metal tile
        for (const [mx, my] of dirs) {

          const tx = nx + mx;
          const ty = ny + my;

          if (!grid.inBounds(tx, ty)) continue;

          if (grid.get(tx, ty) === CellType.Metal) {

         
            grid.setMeta(tx, ty, 5);

            break;
          }
        }
      }

      // current electric disappears after entering metal
      grid.set(x, y, CellType.Empty);
      grid.setMeta(x, y, 0);

      break;

    // anything else destroys it
    default:
      grid.set(x, y, CellType.Empty);
      grid.setMeta(x, y, 0);
      break;
  }
}