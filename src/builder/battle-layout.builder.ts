import { createCanvas, loadImage } from 'canvas';
import { Canvas, CanvasRenderingContext2D } from 'canvas/types';
import fs from 'fs';
import dirTree from 'directory-tree';

import { IBuilder } from './builder.interface';
import { Environment, Trainer, Pokemon, BaseCircle } from '@components';
import { resourceResolve } from '@/helpers';

export class BattleLayoutBuilder implements IBuilder {
  private canvas: Canvas;
  private ctx: CanvasRenderingContext2D;
  private width: number = 400;
  private height: number = 400;

  private baseCircle: BaseCircle;
  private competitorBaseCircle: BaseCircle;
  private environment: Environment;
  private trainer: Trainer | undefined;
  private pokemon: Pokemon | undefined;
  private competitorTrainer: Trainer | undefined;
  private competitorPokemon: Pokemon | undefined;

  // trainer
  private positions: any = {};

  constructor() {
    this.canvas = createCanvas(this.width, this.height);
    this.ctx = this.canvas.getContext('2d');

    this.drawBorder(this.width, this.height, 5);

    this.environment = new Environment();
    this.baseCircle = new BaseCircle();
    this.competitorBaseCircle = new BaseCircle({isCompetitor: true});
  }

  async prepare() {
    await this.setEnvironment(this.environment);
    // draw base-circle
    await this.setSelfBaseCircle(this.baseCircle);
    await this.setCompetitorBaseCircle(this.competitorBaseCircle);
  }

  reset() {}

  async setEnvironment(environment: Environment) {
    try {
      this.environment = environment;

      // @ts-ignore
      const {width, height} = await environment.size();
      const bufferImg = await environment.toBuffer();
      const image = await loadImage(bufferImg);

      this.width = width;
      this.height = height;
      this.canvas = createCanvas(width, height);
      this.ctx = this.canvas.getContext('2d');

      this.ctx.drawImage(image, 0, 0);
      // this.drawBorder(this.width, this.height, 5);
    } catch (err) {
      console.log('setEnvironment err=', err);
    }
  }

  async setTrainer(trainer: Trainer) {
    if (trainer.isCompetitor) return this.setCompetitorTrainer(trainer);

    return this.setSelfTrainer(trainer);
  }

  async setSelfTrainer(trainer: Trainer) {
    this.trainer = trainer;

    const bufferImg = await this.trainer.toBuffer();
    const image = await loadImage(bufferImg);
    const {width: trainerW, height: trainerH} = await this.trainer.size();

    const padding = 0;
    let xPos = 0;
    let yPos = this.height - trainerH - padding;

    this.ctx.drawImage(image, xPos, yPos);

    this.positions.trainer = {x: xPos, y: yPos, w: trainerW, h: trainerH};
  }

  async setCompetitorTrainer(trainer: Trainer) {
		this.competitorTrainer = trainer;

    const bufferImg = await trainer.toBuffer();
    const image = await loadImage(bufferImg);
    const {width: trainerW, height: trainerH} = await this.competitorTrainer.size();

    const padding = 0;
    let xPos = this.width - trainerW - padding;
    let yPos = 0;

    this.ctx.drawImage(image, xPos, yPos);

    this.positions.trainerEnemy = {x: xPos, y: yPos, w: trainerW, h: trainerH};
  }

  async setPokemon(pokemon: Pokemon) {
    if (pokemon.isCompetitor) return this.setCompetitorPokemon(pokemon);

    return this.setSelfPokemon(pokemon);
  }

  async setSelfPokemon(pokemon: Pokemon) {
		this.pokemon = pokemon;

    const bufferImg = await this.pokemon.toBuffer();
    const image = await loadImage(bufferImg);
    const {width: pkmW, height: pkmH} = await this.pokemon.size();
    const {
      x: trainerX,
      y: trainerY,
      w: trainerW,
      h: trainerH,
    } = this.positions.trainer;

    const padding = 20;
    let xPos = 0 + trainerW - padding;
    let yPos = this.height - pkmH + 20;

    this.ctx.drawImage(image, xPos, yPos);
  }

  async setCompetitorPokemon(pokemon: Pokemon) {
		this.competitorPokemon = pokemon;

    const bufferImg = await this.competitorPokemon.toBuffer();
    const image = await loadImage(bufferImg);
    const {width: pkmW, height: pkmH} = await this.competitorPokemon.size();
    const {
      x: trainerX,
      y: trainerY,
      w: trainerW,
      h: trainerH,
    } = this.positions.trainerEnemy;

    console.log('this.positions.trainerEnemy=', this.positions.trainerEnemy);

    const padding = 20;
    let xPos = trainerX - pkmW + 40;
    let yPos = 0;

    this.ctx.drawImage(image, xPos, yPos);

    this.positions.pokemonEnemy = {x: xPos, y: yPos, w: pkmW, h: pkmH};
  }

  async setCompetitorBaseCircle(baseCircle: BaseCircle) {
    this.competitorBaseCircle = baseCircle;

    const bufferBase = await this.competitorBaseCircle.toBuffer();
    const imgBase = await loadImage(bufferBase);
    const {width: baseW, height: baseH} =
      await this.competitorBaseCircle.size();
    // const { x: pkmX, y: pkmY, w: pkmW, h: pkmH } = this.positions.pokemonEnemy;

    const padding = -20;
    let xPos = this.width - baseW - 10;
    let yPos = 40;

    this.ctx.drawImage(imgBase, xPos, yPos);
  }

  async setSelfBaseCircle(baseCircle: BaseCircle) {
    this.baseCircle = baseCircle;

    const bufferBase = await this.baseCircle.toBuffer();
    const imgBase = await loadImage(bufferBase);
    const {width: baseW, height: baseH} = await this.baseCircle.size();

    const padding = -20;
    let xPos = 0 + padding;
    let yPos = this.height - baseH;

    this.ctx.drawImage(imgBase, xPos, yPos);
  }

  render() {}

  renderImage(fileAddress: string) {
    console.log('render ...', fileAddress);

    const out = fs.createWriteStream(fileAddress);
    const stream = this.canvas.createPNGStream();

    stream.pipe(out);
    out.on('finish', () => console.log('The PNG file was created.'));
    // console.log('dataURL:', this.canvas.toDataURL())
  }

  drawBorder(width: number, height: number, borderWidth: number = 1) {
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = borderWidth;
    this.ctx.strokeRect(0, 0, width, height);
  }

  getResourceTree() {
    const resourcePath = resourceResolve();

    return dirTree(resourcePath, {
      extensions: /\.(png|jpg|jpeg)$/,
    });
  }
}
