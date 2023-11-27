import { createCanvas, loadImage } from 'canvas';
import { Canvas, CanvasRenderingContext2D, Image } from 'canvas/types';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'node:util';

import { IBuilder } from './builder.interface';

const gm = require('gm');

export class BattleLayoutBuilder implements IBuilder {
	private readonly canvas: Canvas;
	private readonly ctx: CanvasRenderingContext2D;
	private readonly width: number;
	private readonly height: number;

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
		this.canvas = createCanvas(width, height);
		this.ctx = this.canvas.getContext('2d');

		this.drawBorder(this.width, this.height, 5);
	}

	reset() {}

	async setBackground() {
		const bgAddress = path.join(__dirname, '../resources/PBS.png');
		const toBuffer = (): Promise<Buffer> => {
			return new Promise((resolve, reject) => {
				gm(bgAddress).resize(this.width, this.height).toBuffer('PNG', (err: any, buffer: Buffer) => {
					if (err) return reject(err);
					return resolve(buffer);
				})
			})
		}

		try {
			const bufferImg = await toBuffer();
			const image = await loadImage(bufferImg);

			this.ctx.drawImage(image, 0, 0);
		} catch (err) {
			console.log('err=', err)
		}
	}

	setTrainner() {}
	setPokemon() {}
	render() {}

	renderImage(fileAddress: string) {
		console.log('render ...', fileAddress);

		const out = fs.createWriteStream(fileAddress);
		const stream = this.canvas.createPNGStream();

		stream.pipe(out)
		out.on('finish', () =>  console.log('The PNG file was created.'))
		// console.log('dataURL:', this.canvas.toDataURL())
	}

	drawBorder(width: number, height: number, borderWidth: number = 1) {
	  this.ctx.strokeStyle = 'red';
	  this.ctx.lineWidth = borderWidth;
	  this.ctx.strokeRect(0, 0, width, height);
	}
}
