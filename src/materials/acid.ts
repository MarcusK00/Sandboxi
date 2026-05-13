import type { Grid } from "../world/grid";
import { CellType } from "../engine/types";

const SPREAD = 1;


export function updateAcid(grid: Grid, x: number, y: number) {
  if (y + 1 >= grid.height) return;


switch (grid.get(x, y + 1)) {
    case CellType.Empty:
        if (Math.random() > 0.9) return;
      grid.swap(x, y, x, y + 1);
      break;

    case CellType.Stone: {
  if (Math.random() < 0.3) {
    grid.set(x, y + 1, CellType.Empty);
    grid.set(x, y, CellType.Empty);
  }

  if (Math.random() < 0.4) {
    const dir = Math.random() < 0.5 ? -1 : 1;
    const nx = x + dir;
    if (grid.inBounds(nx, y + 1) && grid.get(nx, y + 1) === CellType.Stone) {
      grid.set(nx, y + 1, CellType.Empty);
    }
  }
  break;
}

    case CellType.Obsidian: {
  if (Math.random() < 0.1) {
    grid.set(x, y + 1, CellType.Empty);
    grid.set(x, y, CellType.Empty);
  }

  if (Math.random() < 0.3) {
    const dir = Math.random() < 0.5 ? -1 : 1;
    const nx = x + dir;
    if (grid.inBounds(nx, y + 1) && grid.get(nx, y + 1) === CellType.Stone) {
      grid.set(nx, y + 1, CellType.Empty);
    }
  }
  break;
}

    case CellType.Metal: {
  if (Math.random() < 0.4) {
    grid.set(x, y + 1, CellType.Empty);
  }

  if (Math.random() < 0.3) {
    const dir = Math.random() < 0.5 ? -1 : 1;
    const nx = x + dir;
    if (grid.inBounds(nx, y + 1) && grid.get(nx, y + 1) === CellType.Metal) {
      grid.set(nx, y + 1, CellType.Empty);
    }
  }
  break
}

            case CellType.Acid:
                if (Math.random() > 0.5) return;
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
        

    default: {
      grid.set(x, y + 1, CellType.Empty);
      grid.set(x,y,CellType.Empty);
    
   }
}}