export const CellType = {
  Empty: 0,
  Sand: 1,
  Stone: 2,
  Water: 3,
  Glitch: 4,
  Electric: 5,
  Metal: 6,
  Lava:7,
  Fire:8,
  Obsidian:9,
  Oil:10,
  Acid:11,
} as const;

export type CellType = (typeof CellType)[keyof typeof CellType]; 
