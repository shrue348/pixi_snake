import * as PIXI from 'pixi.js';
import { Scene } from 'pixi-scenes';
import Button from '../classes/Button';
import Player from '../classes/Player';
import Engine from '../classes/Engine';
import Game from '../classes/Game';

export default class GameScene extends Scene {
  private engine: Engine;
  private game: Game;
  private score: PIXI.Text;

  private backBtn: Button;
  private leftBtn: Button;
  private rightBtn: Button;
  private upBtn: Button;
  private downBtn: Button;

  constructor (engine: any) {
    super();
    this.engine = engine;
    this.game = new Game(this.engine);
  }

  public init(): void {
    this.addChild(this.game);

    this.backBtn = new Button({
      texture: this.app.loader.resources['button_small'].texture,
      textureClick: this.app.loader.resources['button_click_small'].texture,
      x: 980,
      y: 55,
      width: 400,
      height: 200,
      scale: .4,
      onClick: () => this.back(),
      text: 'Назад',
      callbackOnKeyUp: true,
    });
    this.addChild(this.backBtn);

    this.leftBtn = new Button({
      texture: this.app.loader.resources['button_round'].texture,
      textureClick: this.app.loader.resources['button_click_round'].texture,
      x: 145,
      y: 1430,
      width: 256,
      height: 256,
      controller: 'left',
      text: 'Влево',
    });
    this.addChild(this.leftBtn);

    this.rightBtn = new Button({
      texture: this.app.loader.resources['button_round'].texture,
      textureClick: this.app.loader.resources['button_click_round'].texture,
      x: 410,
      y: 1430,
      width: 256,
      height: 256,
      controller: 'right',
      text: 'Вправо',
    });
    this.addChild(this.rightBtn);

    this.downBtn = new Button({
      texture: this.app.loader.resources['button_round'].texture,
      textureClick: this.app.loader.resources['button_click_round'].texture,
      x: 675,
      y: 1430,
      width: 256,
      height: 256,
      controller: 'down',
      text: 'Вниз',
    });
    this.addChild(this.downBtn);

    this.upBtn = new Button({
      texture: this.app.loader.resources['button_round'].texture,
      textureClick: this.app.loader.resources['button_click_round'].texture,
      x: 940,
      y: 1430,
      width: 256,
      height: 256,
      controller: 'up',
      text: 'Вверх',
    });
    this.addChild(this.upBtn);

  }

  public start(): void {
    this.game.startNewGame();
    console.log('srtart')
  }

  public stop(): void {

  }

  public back() {
    this.game.gameOver();
    this.scenes.start('mainMenu');
    
  }

  public update(delta: number): void {

  }
}
