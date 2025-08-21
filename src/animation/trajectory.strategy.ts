import {Position, Velocity} from '@/interface';

export interface TrajectoryStrategy {
  getPosition(
    source: Position,
    target: Position,
    frame: number,
    totalFrames: number,
    velocity?: Velocity | null
  ): Position;
}
