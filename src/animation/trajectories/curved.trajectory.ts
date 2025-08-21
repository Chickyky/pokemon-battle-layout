import {Position} from '@/interface';
import {TrajectoryStrategy} from '../trajectory.strategy';

export class CurvedTrajectory implements TrajectoryStrategy {
  getPosition(
    source: Position,
    target: Position,
    frame: number,
    totalFrames: number
  ) {
    const progress = Math.min(frame / totalFrames, 1);
    const baseX = source.x + (target.x - source.x) * progress;
    const baseY = source.y + (target.y - source.y) * progress;
    const curveOffset = Math.sin(progress * Math.PI) * 40;
    return {x: baseX, y: baseY - curveOffset};
  }
}
