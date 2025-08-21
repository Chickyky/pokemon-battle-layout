import {CanvasRenderingContext2D} from 'canvas';

import {SpriteManager} from '@/animation';
import {TrajectoryStrategy} from '@/animation/trajectory.strategy';
import {Position, Projectile, Velocity} from '@/interface';

export class ProjectileRenderer {
  private projectiles: Projectile[] = [];

  constructor(
    private spriteManager: SpriteManager,
    private trajectory: TrajectoryStrategy
  ) {}

  /**
   * Khởi tạo một projectile bay từ source -> target
   * với vận tốc ban đầu vx, vy
   */
  spawnProjectile(
    source: Position,
    vx: number,
    vy: number,
    spriteIndex: number
  ) {
    this.projectiles.push({
      x: source.x,
      y: source.y,
      vx,
      vy,
      spriteIndex,
    });
  }

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
    this.projectiles.forEach(proj => {
      let velocity: Velocity | null = null;

      if (proj.vx && proj.vy) {
        velocity = {
          vx: proj.vx,
          vy: proj.vy,
        };
      }

      const {x, y} = this.trajectory.getPosition(
        source,
        target,
        frame,
        totalFrames,
        velocity
      );

      this.spriteManager.drawSprite(ctx, spriteIndex, x, y, width, height);
    });
  }
}
