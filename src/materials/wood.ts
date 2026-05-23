import type { Grid } from "../world/grid";
import { CellType } from "../engine/types";

export function updateWood(grid: Grid, x: number, y: number) {
    if (grid.get(x, y) !== CellType.Wood) return;

    const meta = grid.getMeta(x, y);

    if (meta > 0) {
        // Emit fire to the sides
        if (Math.random() < 0.05) {
            const fireOffsets = [[1, 0], [-1, 0]];
            for (const [dx, dy] of fireOffsets) {
                const nx = x + dx;
                const ny = y + dy;
                if (grid.inBounds(nx, ny) && grid.get(nx, ny) === CellType.Empty) {
                    grid.set(nx, ny, CellType.Fire);
                    grid.setMeta(nx, ny, 3);
                    break;
                }
            }
        }

        // Emit smoke above
        if (Math.random() < 0.03) {
            const ny = y - 1;
            if (grid.inBounds(x, ny) && grid.get(x, ny) === CellType.Empty) {
                grid.set(x, ny, CellType.Smoke);
                grid.setMeta(x, ny, 20);
            }
        }

        const newMeta = meta - 0.3; // faster burn

        if (newMeta <= 0) {
            grid.set(x, y, CellType.Empty);
            grid.setMeta(x, y, 0);
        } else {
            grid.setMeta(x, y, newMeta);
        }

        return;
    }

    // Not burning — check for adjacent fire/lava
    const neighbors = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (const [dx, dy] of neighbors) {
        const nx = x + dx;
        const ny = y + dy;
        if (!grid.inBounds(nx, ny)) continue;
        const n = grid.get(nx, ny);
        if ((n === CellType.Fire || n === CellType.Lava) && Math.random() < 0.006) { // was 0.002, catches faster {
            grid.setMeta(x, y, 80);
            return;
        }
    }
}