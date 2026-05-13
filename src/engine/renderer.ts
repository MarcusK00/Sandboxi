import { Application, Sprite, Texture } from "pixi.js";
import { BufferImageSource } from "pixi.js";
import { Simulation } from "./simulation";
import { cellColors } from "../materials/materials";
import { createUI } from "../ui/ui";

export class Renderer {
  readonly app: Application;
  canvas!: HTMLCanvasElement;
  source!: BufferImageSource;
  readonly pixels: Uint8Array;
  readonly texture: Texture;
  readonly sprite: Sprite;

  private constructor(width: number, height: number) {
    this.app = new Application();
    this.pixels = new Uint8Array(width * height * 4);
    this.source = new BufferImageSource({ resource: this.pixels, width, height });
    this.texture = Texture.from(this.source);
    this.sprite = new Sprite(this.texture);
  }

  static async create(sim: Simulation, onMaterialSelect: (id: string) => void) {
    const renderer = new Renderer(sim.width, sim.height);

    await renderer.app.init({
      width: sim.width,
      height: sim.height,
      background: "#000000",
      antialias: false,
    });

    renderer.canvas = renderer.app.canvas as HTMLCanvasElement;
    renderer.canvas.style.cssText = `
      display: block;
      image-rendering: pixelated;
      width: 100vw;
      height: 100vh;
    `;
    document.body.appendChild(renderer.canvas);
    renderer.app.stage.addChild(renderer.sprite);

    createUI(onMaterialSelect);

    return renderer;
  }

  render(sim: Simulation) {
    const grid = sim.grid.cells;
    for (let i = 0; i < grid.length; i++) {
      const p = i * 4;
      const [r, g, b] = cellColors[grid[i]] ?? [0, 0, 0];
      this.pixels[p] = r; this.pixels[p + 1] = g;
      this.pixels[p + 2] = b; this.pixels[p + 3] = 255;
    }
    this.source.update();
  }
}