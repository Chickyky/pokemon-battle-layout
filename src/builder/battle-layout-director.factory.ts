import { BattleLayoutBuilder } from "./battle-layout.builder";
import { BattleLayoutDirector } from "./battle-layout.director";
import { BossBattleDirector, TournamentBattleDirector } from "./directors";

export type BattleType = 'tournament' | 'boss' | 'default';

export class BattleLayoutDirectoryFactory {
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
}