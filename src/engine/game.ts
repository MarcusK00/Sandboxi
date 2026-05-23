import { Simulation } from "./simulation";
import { Renderer } from "./renderer";
import { Input } from "./input";
import { CellType } from "./types";

export class Game {
  simulation!: Simulation;
  renderer!: Renderer;
  input!: Input;

  async init() {
    this.simulation = new Simulation(320, 180);
    this.renderer = await Renderer.create(this.simulation, (id) => {
      if (id === "sand") this.input.setMaterial(CellType.Sand);
      if (id === "stone") this.input.setMaterial(CellType.Stone);
      if (id === "water") this.input.setMaterial(CellType.Water);
      if (id === "glitch") this.input.setMaterial(CellType.Glitch);
      if (id === "electric") this.input.setMaterial(CellType.Electric);
      if (id === "metal") this.input.setMaterial(CellType.Metal);
      if (id === "lava") this.input.setMaterial(CellType.Lava);
      if (id === "fire") this.input.setMaterial(CellType.Fire);
      if (id === "obsidian") this.input.setMaterial(CellType.Obsidian);
      if (id === "oil") this.input.setMaterial(CellType.Oil);
      if (id === "acid") this.input.setMaterial(CellType.Acid);
      if (id === "fuse") this.input.setMaterial(CellType.Fuse);
      if (id === "ice") this.input.setMaterial(CellType.Ice);
      if (id === "mud") this.input.setMaterial(CellType.Mud);
      if (id === "smoke") this.input.setMaterial(CellType.Smoke);
      if (id === "steam") this.input.setMaterial(CellType.Steam);
      if (id === "wood") this.input.setMaterial(CellType.Wood);
    });
    this.input = new Input(this.renderer.canvas, this.simulation);
  }

  start() {
    const frame = () => {
      this.simulation.update();
      this.renderer.render(this.simulation);
      requestAnimationFrame(frame);
    };

    frame();
  }


}