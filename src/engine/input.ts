import type { Simulation } from "./simulation";
import { CellType } from "./types";

export class Input {
    
  private canvas: HTMLCanvasElement;
  private simulation: Simulation;
  private painting = false;
  private lastEvent: MouseEvent | null = null;
  private holdInterval: number | null = null;
  private selectedMaterial: number = CellType.Sand;
    
  constructor(canvas: HTMLCanvasElement, simulation: Simulation, ) {
    this.canvas = canvas;
    this.simulation = simulation;
    canvas.addEventListener("mousedown", (e) => { this.painting = true; this.lastEvent = e; this.startHold(); this.place(e); });
    canvas.addEventListener("mousemove", (e) => { this.lastEvent = e; if (this.painting) this.place(e); });
    canvas.addEventListener("mouseup",   () => { this.painting = false; this.stopHold(); });
    canvas.addEventListener("mouseleave",() => { this.painting = false; this.stopHold(); });
    window.addEventListener("keydown", (e) => { this.onKey(e); });
  }


  private onKey(e: KeyboardEvent) {
    switch (e.key) {
      case "r": this.simulation.reset();  console.log("Reset");break;
    case "1": this.setMaterial(CellType.Sand);  break;
    case "2": this.setMaterial(CellType.Stone); break;
    case "3": this.setMaterial(CellType.Water); break;
     case "4": this.setMaterial(CellType.Glitch); break;
      case "5": this.setMaterial(CellType.Electric); break;
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

  private place(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) * (this.simulation.width  / rect.width));
    const y = Math.floor((event.clientY - rect.top)  * (this.simulation.height / rect.height));
    this.simulation.place(x, y, this.selectedMaterial);
  }

  setMaterial(type: number) {
  this.selectedMaterial = type;
}


}