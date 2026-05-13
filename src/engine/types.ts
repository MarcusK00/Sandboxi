export const CellType = {
  Empty: 0,
  Sand: 1,
  Stone: 2,
  Water: 3,
  Glitch: 4,
  Electric: 5,
} as const;

export type CellType = (typeof CellType)[keyof typeof CellType]; 