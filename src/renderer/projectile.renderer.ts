import {CanvasRenderingContext2D} from 'canvas';

import {SpriteManager} from '@/animation';
import { TrajectoryStrategy} from '@/animation/trajectory.strategy';
import { Position } from '@/interface';

export class ProjectileRenderer {
  constructor(
    private spriteManager: SpriteManager,
    private trajectory: TrajectoryStrategy
  ) {}

  renderProjectile(
    ctx: CanvasRenderingContext2D,
    spriteIndex: number,
    source: Position,
    target: Position,
    frame: number,
    totalFrames: number,
    width = 32,
    height = 32
  ) {
    const {x, y} = this.trajectory.getPosition(
      source,
      target,
      frame,
      totalFrames
    );

    this.spriteManager.drawSprite(ctx, spriteIndex, x, y, width, height);
  }
}
