import {BattleLayoutBuilder} from './battle-layout.builder';
import {MoveAnimator} from '../animation/move.animator';
import {BattleLayout} from './battle-layout';

export class BattleLayoutDirector {
  constructor(protected builder: BattleLayoutBuilder) {}

  constructBattle(): BattleLayout {
    return this.builder.build();
  }

  async runTurn(move: MoveAnimator, outputPath: string) {}
}
