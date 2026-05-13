import { Game } from "./engine/game";

const game = new Game();

await game.init();
game.start();

//init