import {Position} from '@/interface';
import {TrajectoryStrategy} from '../trajectory.strategy';

export class LinearTrajectory implements TrajectoryStrategy {
  getPosition(
    source: Position,
    target: Position,
    frame: number,
    totalFrames: number
  ) {
    const progress = Math.min(frame / totalFrames, 1);

    return {
      x: source.x + (target.x - source.x) * progress,
      y: source.y + (target.y - source.y) * progress,
    };
  }
}
