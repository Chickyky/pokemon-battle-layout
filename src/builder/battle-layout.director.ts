import { Canvas, CanvasRenderingContext2D, createCanvas } from 'canvas';
import fs from 'fs';

import { BattleLayoutBuilder } from './battle-layout.builder';

export class BattleLayoutDirector {
  private canvas: Canvas;
  private ctx: CanvasRenderingContext2D;
  private width: number = 400;
  private height: number = 400;

  // TODO: add interface
  // trainer
  private positions: any = {};

  constructor(private builder: BattleLayoutBuilder) {
    this.canvas = createCanvas(this.width, this.height);
    this.ctx = this.canvas.getContext('2d');
  }

  private async render() {
    // clean canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.positions = {};

    await this.renderEnvironment();
    await this.renderBaseSelf();
    await this.renderBaseCompetitor();

    await this.renderTrainerSelf();
    await this.renderPokemonSelf();

    await this.renderTrainerCompetitor();
    await this.renderPokemonCompetitor();
  }

  private async renderEnvironment() {
    if (!this.builder.environment) return;

    const image = await this.builder.environment.getImage();

    this.width = image.width;
    this.height = image.height;
    this.canvas = createCanvas(image.width, image.height);
    this.ctx = this.canvas.getContext('2d');

    this.ctx.drawImage(image, 0, 0);
  }
  private async renderBaseSelf() {
    if (!this.builder.baseCircle) return;

    const imgBase = await this.builder.baseCircle.getImage();

    const padding = -20;
    let xPos = 0 + padding;
    let yPos = this.height - imgBase.height;

    this.ctx.drawImage(imgBase, xPos, yPos);
  }
  private async renderBaseCompetitor() {
    if (!this.builder.competitorBaseCircle) return;

    const imgBase = await this.builder.competitorBaseCircle.getImage();

    const padding = -20;
    let xPos = this.width - imgBase.width - 10;
    let yPos = 40;

    this.ctx.drawImage(imgBase, xPos, yPos);
  }
  private async renderTrainerSelf() {
    if (!this.builder.trainer) return;

    const image = await this.builder.trainer.getImage();

    const padding = 0;
    let xPos = 0;
    let yPos = this.height - image.height - padding;

    this.ctx.drawImage(image, xPos, yPos);
    this.positions.trainer = {
      x: xPos,
      y: yPos,
      w: image.width,
      h: image.height,
    };
  }
  private async renderTrainerCompetitor() {
    if (!this.builder.competitorTrainer) return;

    const image = await this.builder.competitorTrainer.getImage();

    const padding = 0;
    let xPos = this.width - image.width - padding;
    let yPos = 0;

    this.ctx.drawImage(image, xPos, yPos);

    this.positions.trainerEnemy = {
      x: xPos,
      y: yPos,
      w: image.width,
      h: image.height,
    };
  }
  private async renderPokemonSelf() {
    if (!this.builder.pokemon) return;

    const image = await this.builder.pokemon.getImage();
    const {
      x: trainerX,
      y: trainerY,
      w: trainerW,
      h: trainerH,
    } = this.positions.trainer;

    const padding = 20;
    let xPos = 0 + trainerW - padding;
    let yPos = this.height - image.height + 20;

    this.ctx.drawImage(image, xPos, yPos);
  }
  private async renderPokemonCompetitor() {
    if (!this.builder.competitorPokemon) return;

    const image = await this.builder.competitorPokemon.getImage();
    const {
      x: trainerX,
      y: trainerY,
      w: trainerW,
      h: trainerH,
    } = this.positions.trainerEnemy;

    console.log('this.positions.trainerEnemy=', this.positions.trainerEnemy);

    const padding = 20;
    let xPos = trainerX - image.width + 40;
    let yPos = 0;

    this.ctx.drawImage(image, xPos, yPos);

    this.positions.pokemonEnemy = {x: xPos, y: yPos, w: image.width, h: image.height};
  }

  async renderImage(fileAddress: string) {
      console.log('render ...', fileAddress);

      await this.render();

      const out = fs.createWriteStream(fileAddress);
      const stream = this.canvas.createPNGStream();
      stream.pipe(out);

      return new Promise((resolve, reject) => {
        out.on('finish', () => {
          resolve(fileAddress);
        });

        out.on('error', err => {
          reject(err);
        });
      });
    }
}
