import { CanvasRenderingContext2D } from 'canvas';

import { SpriteManager } from './sprite.manager';
import { RectPosition } from '@/interface';

export abstract class MoveAnimator {
  protected spriteManager: SpriteManager;
  protected spriteIndex: number; // sprite dùng cho move
  protected attackerPos: RectPosition;
  protected defenderPos: RectPosition;

  constructor(
    spriteManager: SpriteManager,
    spriteIndex: number,
    attackerPos: RectPosition,
    defenderPos: RectPosition
  ) {
    this.spriteManager = spriteManager;
    this.spriteIndex = spriteIndex;
    this.attackerPos = attackerPos;
    this.defenderPos = defenderPos;
  }

  /**
   * Hàm này sẽ do từng move implement riêng
   * - ctx: context canvas để vẽ
   * - frame: index frame hiện tại
   */
  abstract updateFrame(ctx: CanvasRenderingContext2D, frame: number): void;
}
