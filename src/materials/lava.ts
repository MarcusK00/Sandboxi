import type { Grid } from "../world/grid";
import { CellType } from "../engine/types";
const SPREAD = 1;

export function updateLava(grid: Grid, x: number, y: number) {
  if (y + 1 >= grid.height) return;

  const neighborOffsets = [[1, 0], [-1, 0], [0, -1]];
  for (const [dx, dy] of neighborOffsets) {
    const nx = x + dx;
    const ny = y + dy;
    if (!grid.inBounds(nx, ny)) continue;
    const neighbor = grid.get(nx, ny);

    if ((neighbor === CellType.Water || neighbor === CellType.Ice) && Math.random() < 0.35) {
      for (let ody = -1; ody <= 1; ody++) {
        for (let odx = -1; odx <= 1; odx++) {
          const cx = x + odx;
          const cy = y + ody;
          if (!grid.inBounds(cx, cy)) continue;
          const cell = grid.get(cx, cy);
          if (cell === CellType.Lava || cell === CellType.Water || cell === CellType.Ice) {
            grid.set(cx, cy, CellType.Obsidian);
          }
        }
      }
      const steamY = y - 1;
      if (grid.inBounds(x, steamY) && grid.get(x, steamY) === CellType.Empty) {
        grid.set(x, steamY, CellType.Steam);
        grid.setMeta(x, steamY, 30);
      }
      return;
    }

    if (neighbor === CellType.Sand && Math.random() < 0.005) {
      grid.set(nx, ny, CellType.Lava);
      return;
    }

    if (neighbor === CellType.Fuse && Math.random() < 0.2) {
      grid.set(nx, ny, CellType.Fire);
      grid.setMeta(nx, ny, 2);
      return;
    }
  }

  switch (grid.get(x, y + 1)) {
    case CellType.Empty: {
      if (Math.random() > 0.4) return;
      grid.swap(x, y, x, y + 1);
      break;
    }
    case CellType.Stone: {
      if (Math.random() < 0.03) {
        grid.set(x, y + 1, CellType.Lava);
      }
      if (Math.random() < 0.005) {
        const dir = Math.random() < 0.5 ? -1 : 1;
        const nx = x + dir;
        if (grid.inBounds(nx, y + 1) && grid.get(nx, y + 1) === CellType.Stone) {
          grid.set(nx, y + 1, CellType.Lava);
        }
      }
      break;
    }
    case CellType.Sand: {
      if (Math.random() < 0.003) {
        grid.set(x, y + 1, CellType.Lava);
      }
      if (Math.random() < 0.005) {
        const dir = Math.random() < 0.5 ? -1 : 1;
        const nx = x + dir;
        if (grid.inBounds(nx, y + 1) && grid.get(nx, y + 1) === CellType.Sand) {
          grid.set(nx, y + 1, CellType.Lava);
        }
      }
      break;
    }
    case CellType.Metal: {
      if (Math.random() < 0.01) {
        grid.set(x, y + 1, CellType.Lava);
      }
      if (Math.random() < 0.005) {
        const dir = Math.random() < 0.5 ? -1 : 1;
        const nx = x + dir;
        if (grid.inBounds(nx, y + 1) && grid.get(nx, y + 1) === CellType.Stone) {
          grid.set(nx, y + 1, CellType.Lava);
        }
      }
      break;
    }
    case CellType.Water: {
      if (Math.random() > 0.35) return;
      const steamY = y - 1;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (!grid.inBounds(nx, ny)) continue;
          const cell = grid.get(nx, ny);
          if (cell === CellType.Lava || cell === CellType.Water) {
            grid.set(nx, ny, CellType.Obsidian);
          }
        }
      }
      if (grid.inBounds(x, steamY) && grid.get(x, steamY) === CellType.Empty) {
        grid.set(x, steamY, CellType.Steam);
        grid.setMeta(x, steamY, 30);
      }
      return;
    }
    case CellType.Ice: {
      if (Math.random() < 0.1) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (!grid.inBounds(nx, ny)) continue;
            const cell = grid.get(nx, ny);
            if (cell === CellType.Lava || cell === CellType.Ice) {
              grid.set(nx, ny, CellType.Obsidian);
            }
          }
        }
        const steamY = y - 1;
        if (grid.inBounds(x, steamY) && grid.get(x, steamY) === CellType.Empty) {
          grid.set(x, steamY, CellType.Steam);
          grid.setMeta(x, steamY, 30);
        }
      }
      return;
    }
    case CellType.Oil: {
      if (Math.random() > 0.5) return;
      grid.swap(x, y, x, y + 1);
      grid.set(x, y, CellType.Fire);
      grid.setMeta(x, y, 0.6);
      break;
    }
    case CellType.Fuse: {
      if (Math.random() > 0.8) return;
      grid.swap(x, y, x, y + 1);
      grid.set(x, y, CellType.Fire);
      grid.setMeta(x, y, 0.6);
      break;
    }
    default: {
      const dir = Math.random() < 0.5 ? -1 : 1;
      if (Math.random() > 0.1) return;
      if (grid.inBounds(x, y + 1) && grid.get(x, y) === CellType.Empty && grid.get(x, y + 1) === CellType.Empty) {
        grid.swap(x, y, x, y + 1);
        break;
      }
      if (Math.random() > 0.6) return;
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