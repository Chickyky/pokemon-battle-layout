import {Position} from '@/interface';
import {TrajectoryStrategy} from '../trajectory.strategy';

export class LinearTrajectory implements TrajectoryStrategy {
  getPosition(
    source: Position,
    target: Position,
    frame: number,
    totalFrames: number,
    velocity?: {vx: number; vy: number}
  ) {
    const progress = Math.min(frame / totalFrames, 1);

    if (velocity) {
      const dx = target.x - source.x;
      const dy = target.y - source.y;

      // tính độ dài quãng đường
      const distance = Math.sqrt(dx * dx + dy * dy);

      // chuẩn hóa hướng
      const dirX = dx / distance;
      const dirY = dy / distance;

      // di chuyển theo velocity
      return {
        x: source.x + dirX * velocity.vx * frame,
        y: source.y + dirY * velocity.vy * frame,
      };
    }

    return {
      x: source.x + (target.x - source.x) * progress,
      y: source.y + (target.y - source.y) * progress,
    };
  }
}
