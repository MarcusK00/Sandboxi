import type { Grid } from "../world/grid";
import { CellType } from "../engine/types";

export function updateFuse(grid: Grid, x: number, y: number) {
    if (grid.get(x, y) !== CellType.Fuse) return;

    // if already burning, do nothing here (handled by fire system)
    if (grid.getMeta(x, y) > 0) {
        grid.set(x, y, CellType.Fire);
        grid.setMeta(x, y, 2);
        return;
    }

    // check if ANY neighbor is fire → strong ignition chance
    const neighbors = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];



    for (const [dx, dy] of neighbors) {
        const nx = x + dx;
        const ny = y + dy;

        if (!grid.inBounds(nx, ny)) continue;

        if (grid.get(nx, ny) === CellType.Fire && Math.random() < 0.001) {

            if (Math.random() < 0.6) {
                grid.set(x, y, CellType.Fire);
                grid.setMeta(x, y, 2);
                return;
            }
        }
    }
}