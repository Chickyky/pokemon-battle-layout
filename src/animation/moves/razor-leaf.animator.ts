import {CanvasRenderingContext2D} from 'canvas';

import {SpriteManager} from '../sprite.manager';
import {MoveAnimator} from '../move.animator';
import {ProjectileRenderer} from '@/renderer/projectile.renderer';
import {CurvedTrajectory} from '../trajectories';
import { RectPoints, RectPosition } from '@/interface';
import { getRectPoints } from '@/helpers';

interface Leaf {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export class RazorLeafAnimator extends MoveAnimator {
  private leaves: Leaf[];
  private attackerRecPoints: RectPoints;
  private defenderRecPoints: RectPoints;

  constructor(
    spriteManager: SpriteManager,
    leafIndex: number,
    attackerPos: RectPosition,
    defenderPos: RectPosition
  ) {
    super(spriteManager, leafIndex, attackerPos, defenderPos);

    this.attackerRecPoints = getRectPoints(attackerPos);
    this.defenderRecPoints = getRectPoints(defenderPos);

    // Vector hướng từ attacker -> defender
    const dx = defenderPos.x - attackerPos.x;
    const dy = defenderPos.y - attackerPos.y;

    // Chuẩn hóa vector (unit vector)
    const length = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / length;
    const uy = dy / length;

    // Hai chiếc lá lệch nhau một chút (khác offset y)
    this.leaves = [
      {
        x: attackerPos.x,
        y: attackerPos.y,
        vx: ux * 5, // tốc độ khởi đầu
        vy: uy * 5,
      },
      {
        x: attackerPos.x,
        y: attackerPos.y + 30,
        vx: ux * 5,
        vy: uy * 5,
      },
    ];
  }

  updateFrame_old(ctx: CanvasRenderingContext2D, frame: number): void {
    ctx.save();

    // Giới hạn vùng vẽ bằng toàn bộ canvas/frame
    ctx.beginPath();
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.clip();

    this.leaves.forEach(leaf => {
      leaf.x += leaf.vx;
      leaf.y += leaf.vy;

      // zig-zag nhẹ
      // leaf.vy += Math.sin(frame / 5) * 0.5;

      // tăng tốc dần (gia tốc nhỏ)
      leaf.vx *= 1.3;
      leaf.vy *= 1.1;

      this.spriteManager.drawSprite(
        ctx,
        this.spriteIndex,
        leaf.x,
        leaf.y,
        32,
        32
      );
    });

    ctx.restore();
  }

  updateFrame(ctx: CanvasRenderingContext2D, frame: number): void {
    const totalFrames = 30;

    const renderer = new ProjectileRenderer(
      this.spriteManager,
      new CurvedTrajectory()
    );

    renderer.renderProjectile(
      ctx,
      this.spriteIndex,
      this.attackerRecPoints.center,
      this.defenderRecPoints.center,
      frame,
      totalFrames,
      32,
      32
    );
  }
}
