import { CellType } from "../engine/types";
import { updateSand } from "./sand";
import { updateWater } from "./water";
import { updateGlitch } from "./glitch";
import { updateElectric } from "./electric";
import type { Grid } from "../world/grid";

export type UpdateFn = (grid: Grid, x: number, y: number) => void;

export const cellColors: Record<number, [number, number, number]> = {
  [CellType.Empty]: [0,   0,   0  ],
  [CellType.Sand]:  [216, 192, 106],
  [CellType.Stone]: [153, 153, 153],
   [CellType.Water]: [99, 99, 255],
   [CellType.Glitch]: [222, 17, 139],
    [CellType.Electric]: [255, 255, 80],
};

export const updateFns: Partial<Record<number, UpdateFn>> = {
  [CellType.Sand]: updateSand,
  [CellType.Water]: updateWater,
  [CellType.Glitch]: updateGlitch,
    [CellType.Electric]: updateElectric,
};