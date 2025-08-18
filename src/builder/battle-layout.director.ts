import {Canvas, CanvasRenderingContext2D, createCanvas} from 'canvas';
import fs from 'fs';

import {BattleLayoutBuilder} from './battle-layout.builder';

export class BattleLayoutDirector {
  constructor(private builder: BattleLayoutBuilder) {}

  constructBattle() {
    return this.builder.build();
  }
}
