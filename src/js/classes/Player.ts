import * as PIXI from 'pixi.js';
import Game from './Game';

export default class Player extends PIXI.Container {
  private game: Game;
  
  private direction: string;
  private tail: PIXI.Container;
  private nose: PIXI.Graphics;
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
    this.visible = false;

    this.tail = new PIXI.Container();
    this.tail.width = 1000;

    for (let i = 0; i < this.game.score + 1; i++) {
      const tailItem = new PIXI.Graphics();
      tailItem.beginFill(0xdddddd);
      tailItem.drawRect(0, 0, this.game.cellWidth, this.game.cellHeight);
      tailItem.endFill();
      tailItem.visible = false;
      this.tail.addChild(tailItem);
    }
    this.addChild(this.tail);

    this.nose = new PIXI.Graphics();
    this.nose.beginFill(0xffffff);
    this.nose.drawRect(this.x, this.y, this.game.cellWidth, this.game.cellHeight);
    this.nose.endFill();
    this.addChild(this.nose);

  };

  public draw() {
    for (let i = this.tail.children.length - 1; i >= 0; i--) {
      const tailItem = this.tail.children[i];

      if (i - 1 >= 0) {
        tailItem.x = this.tail.children[i - 1].x;
        tailItem.y = this.tail.children[i - 1].y;
      } else {
        tailItem.x = this.XX * this.game.cellWidth;
        tailItem.y = this.YY * this.game.cellWidth;
      }
      tailItem.visible = true;
    }

    if (this.direction === 'right') this.XX += 1;
    if (this.direction === 'left') this.XX -= 1;
    if (this.direction === 'up') this.YY -= 1;
    if (this.direction === 'down') this.YY += 1;

    

    if (this.XX > this.game.cellCount - 1) this.XX = 0;
    if (this.XX < 0) this.XX = this.game.cellCount - 1;

    if (this.YY > this.game.cellCount - 1) this.YY = 0;
    if (this.YY < 0) this.YY = this.game.cellCount - 1;

    this.nose.x = this.XX * this.game.cellWidth;
    this.nose.y = this.YY * this.game.cellHeight;
  }

  public setDirection(direction: string) {
    this.direction = direction;
  }

  public addTail() {
    const tailItem = new PIXI.Graphics();
    tailItem.beginFill(0xdddddd);
    tailItem.drawRect(this.x, this.y, this.game.cellWidth, this.game.cellHeight);
    tailItem.endFill();
    tailItem.visible = false;

    this.tail.addChild(tailItem);
  }

  public startNewGame() {
    this.visible = true;
    this.XX = 0;
    this.YY = 0;
    this.setDirection('right');
  }
};
