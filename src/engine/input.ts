import type { Simulation } from "./simulation";
import { CellType } from "./types";
import { switchEmptyColor } from "../materials/materials";

export class Input {
    
  private canvas: HTMLCanvasElement;
  private simulation: Simulation;
  private painting = false;
  private lastEvent: MouseEvent | null = null;
  private holdInterval: number | null = null;
  private selectedMaterial: number = CellType.Sand;
   private brushSize = 1;
   private currentButton = 0;
    
  constructor(canvas: HTMLCanvasElement, simulation: Simulation, ) {
    this.canvas = canvas;
    this.simulation = simulation;
    canvas.addEventListener("mousedown", (e) => { this.painting = true; this.lastEvent = e; this.currentButton = e.button; this.startHold(); this.place(e); });
    canvas.addEventListener('contextmenu', function(ev) { ev.preventDefault(); return false;}, false);
    canvas.addEventListener("mousemove", (e) => { this.lastEvent = e; if (this.painting) this.place(e); });canvas.addEventListener("mouseup", () => {this.painting = false;this.currentButton = 0;this.stopHold();
});
    canvas.addEventListener("mouseleave",() => { this.painting = false; this.stopHold(); });
    window.addEventListener("keydown", (e) => { this.onKey(e); });
  }


  private onKey(e: KeyboardEvent) {
    switch (e.key) {
    case "1": this.setMaterial(CellType.Sand);  break;
    case "2": this.setMaterial(CellType.Stone);  break;
    case "3": this.setMaterial(CellType.Water); break;
    case "4": this.setMaterial(CellType.Glitch); break;
    case "5": this.setMaterial(CellType.Electric);  break;
    case "6": this.setMaterial(CellType.Metal);  break;
    case "7": this.setMaterial(CellType.Lava);  break;
    case "8": this.setMaterial(CellType.Fire);  break;
    case "9": this.setMaterial(CellType.Obsidian);  break;
    case "q": this.setMaterial(CellType.Oil);  break;
    
    case "d": switchEmptyColor(); break;
    case "r": this.simulation.reset();  console.log("Reset");break;
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

private place(event: MouseEvent) {

  const rect = this.canvas.getBoundingClientRect();

  const x = Math.floor(
    (event.clientX - rect.left) *
    (this.simulation.width / rect.width)
  );

  const y = Math.floor(
    (event.clientY - rect.top) *
    (this.simulation.height / rect.height)
  );

 const material =
  this.currentButton === 2
    ? CellType.Empty
    : this.selectedMaterial;

  if (this.brushSize === 1) {
    this.simulation.place(x, y, material);
    return;
  }

  const radius = this.brushSize - 1;

  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {

      if (dx * dx + dy * dy > radius * radius) {
        continue;
      }

      this.simulation.place(
        x + dx,
        y + dy,
        material
      );
    }
  }
}

  setMaterial(type: number) {
  this.selectedMaterial = type;

  switch(type){
    
    case CellType.Stone:
      this.brushSize=2;
      break;
      case CellType.Metal:
      this.brushSize=2;
      break;
      case CellType.Obsidian:
      this.brushSize=2;
      break;
    default:
      this.brushSize=1;
  }
}


}