import { createCanvas, loadImage } from 'canvas';
import { Canvas, CanvasRenderingContext2D, Image } from 'canvas/types';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'node:util';

import { IBuilder } from './builder.interface';

import { Background } from '@/components';
import { resourceResolve } from '../helpers';

const gm = require('gm');
const dirTree = require('directory-tree');

export class BattleLayoutBuilder implements IBuilder {
	private canvas: Canvas;
	private ctx: CanvasRenderingContext2D;
	private width: number;
	private height: number;

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
		this.canvas = createCanvas(width, height);
		this.ctx = this.canvas.getContext('2d');

		this.drawBorder(this.width, this.height, 5);
	}

	reset() {}

	async setBackground(background: Background) {
		try {
			// @ts-ignore
			const { width, height } = await background.size();
			const bufferImg = await background.toBuffer();
			const image = await loadImage(bufferImg);

			this.width = width;
			this.height = height;
			this.canvas = createCanvas(width, height);
			this.ctx = this.canvas.getContext('2d');

			this.ctx.drawImage(image, 0, 0);
			this.drawBorder(this.width, this.height, 5);
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

	getResourceTree() {
		const resourcePath = resourceResolve();

		console.log('resourcePath=', resourcePath);

		return dirTree(resourcePath, {
		  extensions: /\.(png|jpg|jpeg)$/
		});
	}
}
