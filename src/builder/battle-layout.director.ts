import {BattleLayoutBuilder} from './battle-layout.builder';
import {MoveAnimator} from '@/animation';
import {BossBattleDirector, TournamentBattleDirector} from './directors';
import { BattleLayout } from './battle-layout';

export type BattleType = 'tournament' | 'boss' | 'default';

export class BattleLayoutDirector {
  constructor(protected builder: BattleLayoutBuilder) {}

  /*
  factory method
  */
  static create(
    type: BattleType,
    builder: BattleLayoutBuilder
  ): BattleLayoutDirector {
    switch (type) {
      case 'tournament':
        return new TournamentBattleDirector(builder);
      case 'boss':
        return new BossBattleDirector(builder);
      default:
        // fallback Director inline (classic battle)
        return new BattleLayoutDirector(builder);
    }
  }

  constructBattle(): BattleLayout {
    return this.builder.build();
  }

  async runTurn(move: MoveAnimator, outputPath: string) {}
}
