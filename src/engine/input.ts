import type { Simulation } from "./simulation";
import { CellType } from "./types";
import { switchEmptyColor } from "../materials/materials";

export class Input {

  private canvas: HTMLCanvasElement;
  private simulation: Simulation;
  private painting = false;
  private lastEvent: MouseEvent | null = null;
  private lastPlacedX: number | null = null;
  private lastPlacedY: number | null = null;
  private holdInterval: number | null = null;
  private selectedMaterial: number = CellType.Sand;
  private brushSize = 1;
  private currentButton = 0;

  constructor(canvas: HTMLCanvasElement, simulation: Simulation) {
    this.canvas = canvas;
    this.simulation = simulation;

    canvas.addEventListener("mousedown", (e) => {
      this.painting = true;
      this.lastEvent = e;
      this.currentButton = e.button;
      this.startHold();
      const [x, y] = this.eventToGrid(e);
      this.lastPlacedX = x;
      this.lastPlacedY = y;
      this.placeAt(x, y);
    });

    canvas.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();
      return false;
    }, false);

    canvas.addEventListener("mousemove", (e) => {
      this.lastEvent = e;
      if (this.painting) this.place(e);
    });

    canvas.addEventListener("mouseup", () => {
      this.painting = false;
      this.currentButton = 0;
      this.lastPlacedX = null;
      this.lastPlacedY = null;
      this.stopHold();
    });

    canvas.addEventListener("mouseleave", () => {
      this.painting = false;
      this.lastPlacedX = null;
      this.lastPlacedY = null;
      this.stopHold();
    });

    window.addEventListener("keydown", (e) => { this.onKey(e); });
  }

  private onKey(e: KeyboardEvent) {
    switch (e.key) {
      case "1": this.setMaterial(CellType.Sand); break;
      case "2": this.setMaterial(CellType.Stone); break;
      case "3": this.setMaterial(CellType.Water); break;
      case "4": this.setMaterial(CellType.Glitch); break;
      case "5": this.setMaterial(CellType.Electric); break;
      case "6": this.setMaterial(CellType.Metal); break;
      case "7": this.setMaterial(CellType.Lava); break;
      case "8": this.setMaterial(CellType.Fire); break;
      case "9": this.setMaterial(CellType.Obsidian); break;
      case "0": this.setMaterial(CellType.Oil); break;
      case "<": this.setMaterial(CellType.Acid); break;
      case "z": this.setMaterial(CellType.Fuse); break;
      case "x": this.setMaterial(CellType.Ice); break;
      case "c": this.setMaterial(CellType.Mud); break;
      case "v": this.setMaterial(CellType.Smoke); break;
      case "b": this.setMaterial(CellType.Steam); break;
      case "n": this.setMaterial(CellType.Wood); break;
      case "d": switchEmptyColor(); break;
      case "r": this.simulation.reset(); console.log("Reset"); break;
      case "+": this.brushSize++; break;
      case "-": this.brushSize = Math.max(1, this.brushSize - 1); break;
    }
  }

  private startHold() {
    this.holdInterval = setInterval(() => {
      if (this.lastEvent) this.place(this.lastEvent);
    }, 16);
  }

  private stopHold() {
    if (this.holdInterval !== null) {
      clearInterval(this.holdInterval);
      this.holdInterval = null;
    }
  }

  private eventToGrid(event: MouseEvent): [number, number] {
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor(
      (event.clientX - rect.left) * (this.simulation.width / rect.width)
    );
    const y = Math.floor(
      (event.clientY - rect.top) * (this.simulation.height / rect.height)
    );
    return [x, y];
  }

  private placeLine(x0: number, y0: number, x1: number, y1: number) {
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
      this.placeAt(x0, y0);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x0 += sx; }
      if (e2 < dx) { err += dx; y0 += sy; }
    }
  }

  private place(event: MouseEvent) {
    const [x, y] = this.eventToGrid(event);

    if (this.lastPlacedX !== null && this.lastPlacedY !== null) {
      this.placeLine(this.lastPlacedX, this.lastPlacedY, x, y);
    } else {
      this.placeAt(x, y);
    }

    this.lastPlacedX = x;
    this.lastPlacedY = y;
  }

  private placeAt(x: number, y: number) {
    const material = this.currentButton === 2 ? CellType.Empty : this.selectedMaterial;

    if (this.brushSize === 1) {
      this.simulation.place(x, y, material);
      return;
    }

    const radius = this.brushSize - 1;
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        if (dx * dx + dy * dy > radius * radius) continue;
        this.simulation.place(x + dx, y + dy, material);
      }
    }
  }

  setMaterial(type: number) {
    this.selectedMaterial = type;

    switch (type) {
      case CellType.Stone:
      case CellType.Metal:
      case CellType.Obsidian:
      case CellType.Fuse:
      case CellType.Ice:
      case CellType.Wood:
        this.brushSize = 2;
        break;
      default:
        this.brushSize = 1;
    }
  }
}