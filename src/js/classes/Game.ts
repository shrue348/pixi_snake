import * as PIXI from 'pixi.js';
import Engine from '../classes/Engine';
import { fastFloor } from '../helper/helper';
import Apple from './Apple';
import Player from './Player';

export default class Game extends PIXI.Container {
  private engine: Engine;
  private view: PIXI.Container;
  private player: Player;
  private apple: Apple;
  
  private gameSpeed: number;
  private time: number;
  private score: number;
  private scoreText: PIXI.Text;

  public cellCount: number;
  public cellWidth: number;
  public cellHeight: number;

  constructor(
    engine: Engine,
  ) {
    super();

    this.engine = engine;
    this.engine.app.ticker.add(this.tick.bind(this));

    this.x = 0;
    this.y = 0;

    this.score = 0;

    this.view = new PIXI.Container();
    this.view.x = 0;
    this.view.y = this.engine.app.screen.width * .05 * 2;

    this.addChild(this.view);

    const graphics = new PIXI.Graphics();
    // Rectangle
    graphics.beginFill(0x0b3338);
    graphics.drawRect(0, 0, this.engine.app.screen.width, this.engine.app.screen.width);
    graphics.endFill();
    this.view.addChild(graphics);

    this.scoreText = new PIXI.Text('0', {
      fill: '#fff',
      fontSize: 72,
    });
    this.scoreText.x = 40;
    this.scoreText.y = 55;
    this.scoreText.anchor.set(0.5);
    this.addChild(this.scoreText);

    this.cellCount = 23;
    this.cellWidth = this.engine.app.screen.width / this.cellCount;
    this.cellHeight = this.engine.app.screen.width / this.cellCount;
    this.gameSpeed = 100;
    this.time = fastFloor(this.engine.time);

    this.apple = new Apple(this);
    this.player = new Player(this);

    this.view.addChild(this.apple);
    this.view.addChild(this.player);

  };

  private updateScore (score?: number) {
    if (score || score === 0) this.score = score;
    else this.score += 1;

    this.scoreText.text = this.score.toString();
  }

  public startNewGame () {
    this.updateScore(0);
    this.player.XX = 0;
    this.player.setDirection('right');
  }

  tick (delta: number) {
    if (this.engine.controller.up) this.player.setDirection('up');
    if (this.engine.controller.down) this.player.setDirection('down');
    if (this.engine.controller.left) this.player.setDirection('left');
    if (this.engine.controller.right) this.player.setDirection('right');

    if (this.engine.time - this.time > (1 / 1000 * this.gameSpeed)) {
      this.time += (1 / 1000 * this.gameSpeed);

      this.player.draw();
      this.apple.draw();
      this.scoreText.text = this.score.toString();

      if (this.player.x === this.apple.x && this.player.y === this.apple.y) {
        this.updateScore();
        this.apple.setNewCoords();
      }
    }
  }
};
