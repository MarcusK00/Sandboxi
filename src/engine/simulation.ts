import { Grid } from "../world/grid";
import { updateFns } from "../materials/materials";
import { CellType } from "./types";

export class Simulation {
  readonly grid: Grid;  
  width: number;
  height: number;

constructor(width: number, height: number) {
  this.width = width;
  this.height = height;
  this.grid = new Grid(width, height);
}

place(x: number, y: number, type: number) {
  if (!this.grid.inBounds(x, y)) return;

if (
  type !== CellType.Empty &&
  this.grid.get(x, y) > 0
) return;
  this.grid.set(x, y, type);

  switch(type){
    case CellType.Glitch:
        this.grid.setMeta(x, y, 5);
    break;
        case CellType.Electric:
       this.grid.setMeta(x, y, 5);
    break;
  }
}

update() {
  for (let y = this.height - 2; y >= 0; y--) {
    for (let x = 0; x < this.width; x++) {
      const cell = this.grid.get(x, y);
      updateFns[cell]?.(this.grid, x, y);
    }
  }
}

reset(){
    this.grid.cells.fill(CellType.Empty);
}
}