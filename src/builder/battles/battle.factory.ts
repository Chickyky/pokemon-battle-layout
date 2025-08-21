import {BattleLayoutBuilder} from '../battle-layout.builder';
import {BattleLayoutDirector} from '../battle-layout.director';

export interface BattleFactory {
  createBuilder(): BattleLayoutBuilder;
  createDirector(builder: BattleLayoutBuilder): BattleLayoutDirector;
}
