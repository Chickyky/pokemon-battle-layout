import {Position} from '@/interface';
import {TrajectoryStrategy} from '../trajectory.strategy';

export class ZigzagTrajectory implements TrajectoryStrategy {
  getPosition(
    source: Position,
    target: Position,
    frame: number,
    totalFrames: number
  ) {
    const progress = Math.min(frame / totalFrames, 1);
    const baseX = source.x + (target.x - source.x) * progress;
    const baseY = source.y + (target.y - source.y) * progress;
    const zigzagOffset = Math.sin(frame / 3) * 20;
    return {x: baseX + zigzagOffset, y: baseY};
  }
}
