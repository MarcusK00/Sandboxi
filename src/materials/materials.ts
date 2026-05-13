import { CellType } from "../engine/types";
import { updateSand } from "./sand";
import { updateWater } from "./water";
import { updateGlitch } from "./glitch";
import { updateLava } from "./lava";
import { updateFire } from "./fire";
import { updateOil } from "./oil";
import { updateElectric } from "./electric";
import { updateAcid } from "./acid";
import type { Grid } from "../world/grid";

let emptyColor: [number, number, number] = [0, 0, 0];
let isBlack = true;

function setEmptyColorToBlack() {
  emptyColor = [0, 0, 0];
  isBlack = true;
}

function setEmptyColorToWhite() {
  emptyColor = [255, 255, 255];
  isBlack = false;
}

export function switchEmptyColor() {
  if (isBlack) {
    setEmptyColorToWhite();
  } else {
    setEmptyColorToBlack();
  }

  cellColors[CellType.Empty] = emptyColor;
}

export type UpdateFn = (grid: Grid, x: number, y: number) => void;

export const cellColors: Record<number, [number, number, number]> = {
  [CellType.Empty]: emptyColor,

  [CellType.Sand]:  [216, 192, 106],
  [CellType.Stone]: [153, 153, 153],
  [CellType.Water]: [99, 99, 255],
  [CellType.Glitch]: [222, 17, 139],
  [CellType.Electric]: [255, 255, 80],
  [CellType.Metal]: [47, 50, 61],
  [CellType.Lava]: [184, 9, 9],
  [CellType.Fire]: [224, 74, 84],
  [CellType.Obsidian]: [35, 53, 98],
  [CellType.Oil]: [99, 46, 10],
  [CellType.Acid]: [161, 252, 3],
};

export const updateFns: Partial<Record<number, UpdateFn>> = {
  [CellType.Sand]: updateSand,
  [CellType.Water]: updateWater,
  [CellType.Glitch]: updateGlitch,
    [CellType.Electric]: updateElectric,
    [CellType.Lava]: updateLava,
    [CellType.Fire]: updateFire,
     [CellType.Oil]: updateOil,
  [CellType.Acid]: updateAcid,
};