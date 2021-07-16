import * as PIXI from 'pixi.js';
import { randomInt } from '../helper/helper';
import Game from './Game';

export default class Player extends PIXI.Container {
  private game: Game;
  private XX: number;
  private YY: number;

  constructor(
    game: Game,
  ) {
    super();

    this.game = game;
    this.XX = 5;
    this.YY = 7;
    this.x = 0;
    this.y = 0;
  
    this.width = this.game.cellWidth;
    this.height = this.game.cellHeight;

    const graphics = new PIXI.Graphics();

    // Rectangle
    graphics.beginFill(0xff0000);
    graphics.drawRect(this.x, this.y, this.game.cellWidth, this.game.cellHeight);
    graphics.endFill();
    this.addChild(graphics);

  };

  public draw() {


    this.x = this.XX * this.game.cellWidth;
    this.y = this.YY * this.game.cellHeight;

  }

  public setNewCoords() {
    this.XX = randomInt(0, this.game.cellCount - 1);
    this.YY = randomInt(0, this.game.cellCount - 1);
  }
};



// var Apple = function(x, y){
// 	this.background = 'red',
// 	this.width = cellWidth,
// 	this.height = cellHeight,
// 	this.x = x,
// 	this.y = y
// }
// Apple.prototype = {
// 	newCoords: function(){
// 		this.x = randomInteger(0, widthCount - 1);
// 		this.y = randomInteger(0, heightCount - 1);
// 		console.log(this.x, this.y)
// 	},
// 	render: function(){
// 		ctx.fillStyle = this.background;
// 		ctx.fillRect(this.x * cellWidth, this.y * cellHeight, this.width, this.height);

// 	}
// }