import type { Grid } from "../world/grid";
import { CellType } from "../engine/types";

export function updateMud(grid: Grid, x: number, y: number) {
    if (y + 1 >= grid.height) return;

    const below = grid.get(x, y + 1);


    if (below === CellType.Empty) {
        if (Math.random() > 0.45) return;

        grid.swap(x, y, x, y + 1);
        return;
    }


    if (below === CellType.Water) {

        if (Math.random() > 0.08) return;

        grid.swap(x, y, x, y + 1);
        return;
    }


    if (Math.random() > 0.985) {
        const dir = Math.random() < 0.5 ? -1 : 1;
        const nx = x + dir;

        if (
            grid.inBounds(nx, y + 1) &&
            grid.get(nx, y) === CellType.Empty &&
            grid.get(nx, y + 1) === CellType.Empty
        ) {
            grid.swap(x, y, nx, y + 1);
            return;
        }
    }
}