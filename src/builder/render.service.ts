import {Canvas, CanvasRenderingContext2D, createCanvas} from 'canvas';
import fs from 'fs';

import {BattleLayout} from './battle-layout';
import {BaseCircle, Environment, Pokemon, Trainer} from '@/components';

export class RenderService {
  private canvas: Canvas;
  private ctx: CanvasRenderingContext2D;
  private positions: any = {};

  constructor(
    private readonly layout: BattleLayout,
    private width = 400,
    private height = 400
  ) {
    this.canvas = createCanvas(this.width, this.height);
    this.ctx = this.canvas.getContext('2d');
  }

  async renderLayout(layout: BattleLayout, width = 400, height = 400) {
    this.positions = {
      trainer: {},
      trainerCompetitor: {},
      pokemon: {},
      pokemonCompetitor: {},
    };

    if (layout.environment) {
      await this.renderEnvironment(layout.environment);
    }

    if (layout.baseCircle) await this.renderBaseSelf(layout.baseCircle);

    if (layout.trainer) await this.renderTrainerSelf(layout.trainer);
    if (layout.pokemon) await this.renderPokemonSelf(layout.pokemon);

    if (layout.baseCircleCompetitor)
      await this.renderBaseCompetitor(layout.baseCircleCompetitor);

    if (layout.trainerCompetitor)
      await this.renderTrainerCompetitor(layout.trainerCompetitor);

    if (layout.pokemonCompetitor)
      await this.renderPokemonCompetitor(layout.pokemonCompetitor);
  }

  private async renderEnvironment(environment: Environment) {
    if (!environment) return;

    const image = await environment.getImage();

    this.canvas = createCanvas(image.width, image.height);
    this.ctx = this.canvas.getContext('2d');

    this.ctx.drawImage(image, 0, 0);
  }
  private async renderBaseSelf(baseCircle: BaseCircle) {
    if (!baseCircle) return;

    const imgBase = await baseCircle.getImage();

    const padding = -20;
    let xPos = 0 + padding;
    let yPos = this.canvas.height - imgBase.height;

    this.ctx.drawImage(imgBase, xPos, yPos);
  }
  private async renderBaseCompetitor(competitorBaseCircle: BaseCircle) {
    if (!competitorBaseCircle) return;

    const imgBase = await competitorBaseCircle.getImage();

    const padding = -20;
    let xPos = this.canvas.width - imgBase.width - 10;
    let yPos = 40;

    this.ctx.drawImage(imgBase, xPos, yPos);
  }
  private async renderTrainerSelf(
    trainer: Trainer
  ) {
    if (!trainer) return;

    const image = await trainer.getImage();

    const padding = 0;
    let xPos = 0;
    let yPos = this.canvas.height - image.height - padding;

    this.ctx.drawImage(image, xPos, yPos);

    this.positions.trainer = {
      x: xPos,
      y: yPos,
      w: image.width,
      h: image.height,
    };
  }

  private async renderTrainerCompetitor(competitorTrainer: Trainer) {
    if (!competitorTrainer) return;

    const image = await competitorTrainer.getImage();

    const padding = 0;
    let xPos = this.canvas.width - image.width - padding;
    let yPos = 0;

    this.ctx.drawImage(image, xPos, yPos);

    this.positions.trainerCompetitor = {
      x: xPos,
      y: yPos,
      w: image.width,
      h: image.height,
    };
  }

  private async renderPokemonSelf(pokemon: Pokemon) {
    if (!pokemon) return;

    const image = await pokemon.getImage();
    const {
      x: trainerX,
      y: trainerY,
      w: trainerW,
      h: trainerH,
    } = this.positions?.trainer;

    const padding = 20;
    let xPos = 0 + trainerW - padding;
    let yPos = this.canvas.height - image.height + 20;

    this.ctx.drawImage(image, xPos, yPos);
  }
  private async renderPokemonCompetitor(competitorPokemon: Pokemon) {
    if (!competitorPokemon) return;

    const image = await competitorPokemon.getImage();
    const {
      x: trainerX,
      y: trainerY,
      w: trainerW,
      h: trainerH,
    } = this.positions?.trainerCompetitor;

    console.log(
      'positions.trainerCompetitor=',
      this.positions?.trainerCompetitor
    );

    const padding = 20;
    let xPos = trainerX - image.width + 40;
    let yPos = 0;

    this.ctx.drawImage(image, xPos, yPos);

    this.positions.pokemonCompatitor = {
      x: xPos,
      y: yPos,
      w: image.width,
      h: image.height,
    };
  }

  async renderImage(fileAddress: string, layout: BattleLayout) {
    console.log('render ...', fileAddress);

    const out = fs.createWriteStream(fileAddress);
    // const canvas = await this.renderLayout(layout);

		await this.renderLayout(layout);

    const stream = this.canvas.createPNGStream();
    stream.pipe(out);

    return new Promise((resolve, reject) => {
      out.on('finish', () => {
        resolve(fileAddress);
      });

      out.on('error', (err: any) => {
        reject(err);
      });
    });
  }
}
