import * as PIXI from 'pixi.js';
import Game from './Game';

export default class Player extends PIXI.Container {
  private game: Game;
  
  private direction: string;
  public XX: number;
  public YY: number;

  constructor(
    game: Game,
  ) {
    super();

    this.game = game;
    this.XX = 0;
    this.YY = 0;
    this.x = 0;
    this.y = 0;
    this.width = this.game.cellWidth;
    this.height = this.game.cellHeight;
    this.direction = 'right';

    const graphics = new PIXI.Graphics();

    // Rectangle
    graphics.beginFill(0xffffff);
    graphics.drawRect(this.x, this.y, this.game.cellWidth, this.game.cellHeight);
    graphics.endFill();
    this.addChild(graphics);
  };

  public draw() {
    if (this.XX > this.game.cellCount - 1) this.XX = 0;
    if (this.XX < 0) this.XX = this.game.cellCount - 1;

    if (this.YY > this.game.cellCount - 1) this.YY = 0;
    if (this.YY < 0) this.YY = this.game.cellCount - 1;

    this.x = this.XX * this.game.cellWidth;
    this.y = this.YY * this.game.cellHeight;

    // if (this.game.engine.controller.up) this.direction = 'up';
    // if (this.game.engine.controller.down) this.direction = 'down';
    // if (this.game.engine.controller.left) this.direction = 'left';
    // if (this.game.engine.controller.right) this.direction = 'right';
    
    if (this.direction === 'right') this.XX += 1;
    if (this.direction === 'left') this.XX -= 1;
    if (this.direction === 'up') this.YY -= 1;
    if (this.direction === 'down') this.YY += 1;
  }

  public setDirection(direction: string) {
    this.direction = direction;
  }
};
