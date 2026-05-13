export class Grid {
  readonly width: number;
  readonly height: number;
  readonly cells: Uint8Array;
  readonly meta: Float32Array;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.cells = new Uint8Array(width * height);
    this.meta = new Float32Array(width * height);
  }

  getMeta(x: number, y: number) { return this.meta[y * this.width + x]; }
  setMeta(x: number, y: number, val: number) { this.meta[y * this.width + x] = val; }

  index(x: number, y: number) {
    return y * this.width + x;
  }

  inBounds(x: number, y: number) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  get(x: number, y: number) {
    return this.cells[this.index(x, y)];
  }

  set(x: number, y: number, value: number) {
    this.cells[this.index(x, y)] = value;
  }

  swap(x1: number, y1: number, x2: number, y2: number) {
  const a = this.index(x1, y1);
  const b = this.index(x2, y2);
  [this.cells[a], this.cells[b]] = [this.cells[b], this.cells[a]];
  [this.meta[a],  this.meta[b]]  = [this.meta[b],  this.meta[a]]; 
  }
}