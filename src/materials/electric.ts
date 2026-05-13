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


  if (Math.random() > 0.7) return;


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

  
    case CellType.Metal:

  
      if (Math.random() < 0.4) {

  
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

    
      grid.set(x, y, CellType.Empty);
      grid.setMeta(x, y, 0);

      break;


    default:
      grid.set(x, y, CellType.Empty);
      grid.setMeta(x, y, 0);
      break;
  }
}