import {Canvas, CanvasRenderingContext2D, createCanvas, registerFont} from 'canvas';
import GIFEncoder from "gifencoder";
import fs from "fs";

import {BaseCircle, Environment, Pokemon, TextBox, Trainer} from '@/components';
import { resourceResolve } from '@/helpers';
import { MoveAnimator } from '@/animation/move.animator';
import { BattleLayout } from '@/builder/battle-layout';

export class RenderService {
  private canvas: Canvas;
  private ctx: CanvasRenderingContext2D;
  private positions: any = {};

  constructor(
    private layout: BattleLayout,
    private width = 400,
    private height = 400
  ) {
    this.canvas = createCanvas(this.width, this.height);
    this.ctx = this.canvas.getContext('2d');

    const fontPath = resourceResolve('font_pokemon-gb/Pokemon GB.ttf');

    // register font
    registerFont(fontPath, {
      family: 'Pokemon GB',
    })
  }

  setLayout(layout: BattleLayout) {
    this.layout = layout;
    return this;
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

    if (layout.baseCircle) {
      await this.renderBaseSelf(layout.baseCircle);
    }

    if (layout.trainer) {
      await this.renderTrainerSelf(layout.trainer);
    }

    if (layout.pokemon) {
      await this.renderPokemonSelf(layout.pokemon);
    }

    if (layout.baseCircleCompetitor) {
      await this.renderBaseCompetitor(layout.baseCircleCompetitor);
    }

    if (layout.trainerCompetitor) {
      await this.renderTrainerCompetitor(layout.trainerCompetitor);
    }

    if (layout.pokemonCompetitor) {
      await this.renderPokemonCompetitor(layout.pokemonCompetitor);
    }

    if (layout.textbox) {
      await this.renderTextbox(layout.textbox);
    }

    const result = {
      canvas: this.canvas,
      ctx: this.ctx
    }

    return result;
  }

  private async renderEnvironment(environment: Environment) {
    if (!environment) return;

    const image = await environment.getImage();

    /* const width = 800;
    const height = 800;
    this.canvas = createCanvas(width, height);
    this.ctx.drawImage(image, 0, 0, width, height); */

    this.canvas = createCanvas(image.width, image.height);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.drawImage(image, 0, 0, image.width, image.height);
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
  private async renderTrainerSelf(trainer: Trainer) {
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

  private async renderTextbox(textbox: TextBox) {
    if (!textbox) return;

    const image = await textbox.getImage();

    const heightOfTexbox = image.height;
    const heightOfCurrentCanvas = this.canvas.height;
    const heightOfNewCanvas = heightOfCurrentCanvas + heightOfTexbox;
    const widthOfNewCanvas = this.canvas.width;

    const newCanvas = createCanvas(widthOfNewCanvas, heightOfNewCanvas);
    const newCtx = newCanvas.getContext('2d');

    // Copy ảnh từ canvas cũ sang canvas mới
    newCtx.drawImage(this.canvas, 0, 0);
    newCtx.drawImage(image, 0, heightOfCurrentCanvas);

    const text = `Pikachu used Thunderbolt! It's super effective against Squirtle.`;
    const padding = 15;
    const font = '8px "Pokemon GB"';
    const color = 'black';
    newCtx.font = font;
    newCtx.fillStyle = color;

    this.wrapText(newCtx, text, padding, heightOfCurrentCanvas + padding, widthOfNewCanvas - padding * 2, 10);

    this.canvas = newCanvas;
    this.ctx = newCtx;
  }

  private wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line, x, currentY);
}

  async renderImage(fileAddress: string) {
    console.log('render ...', fileAddress);

    const out = fs.createWriteStream(fileAddress);

    await this.renderLayout(this.layout);

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

  /**
   * Render animation ra GIF
   */
  async renderGif(move: MoveAnimator, outputPath: string, frames = 30, delay = 100) {
    await this.renderLayout(this.layout);

    const writeStream = fs.createWriteStream(outputPath);
    const encoder = new GIFEncoder(this.canvas.width, this.canvas.height);
    encoder.createReadStream().pipe(writeStream);

    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(delay);
    encoder.setQuality(10);

    for (let frame = 0; frame < frames; frame++) {
      const frameCanvas = createCanvas(this.canvas.width, this.canvas.height);
      const frameCtx = frameCanvas.getContext("2d");

      // Copy lại base scene
      frameCtx.drawImage(this.canvas, 0, 0);

      move.updateFrame(frameCtx, frame);
      encoder.addFrame(frameCtx);
    }

    encoder.finish();
    console.log(`✅ Battle with move exported: ${outputPath}`);

    await new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        console.log(`✅ stream finish: ${outputPath}`);
        resolve(outputPath);
      });

      writeStream.on('error', reject);
    });
  }
}
