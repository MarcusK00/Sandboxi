import type { Grid } from "../world/grid";
import { CellType } from "../engine/types";

export function updateMud(grid: Grid, x: number, y: number) {
    if (y + 1 >= grid.height) return;
    if (Math.random() > 0.6) return;
    switch (grid.get(x, y + 1)) {
        case CellType.Empty:
            grid.swap(x, y, x, y + 1);
            break;



        default:
            const dir = Math.random() < 0.5 ? -1 : 1;
            const nx = x + dir;
            if (Math.random() > 0.99) {

                if (grid.inBounds(nx, y + 1) && grid.get(nx, y) === CellType.Empty) {

                    grid.swap(x, y, nx, y + 1);

                }
            }



    }
}