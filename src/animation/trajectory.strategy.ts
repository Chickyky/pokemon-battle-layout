import {Position} from '@/interface';

export interface TrajectoryStrategy {
  getPosition(
    source: Position,
    target: Position,
    frame: number,
    totalFrames: number
  ): Position;
}
