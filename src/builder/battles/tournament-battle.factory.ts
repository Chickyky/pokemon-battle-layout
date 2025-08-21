import { Environment } from "@/components";
import { BattleLayoutBuilder } from "../battle-layout.builder";
import { BattleFactory } from "./battle.factory";
import { TournamentBattleDirector } from "../directors";

export class TournamentBattleFactory implements BattleFactory {
  createBuilder(): BattleLayoutBuilder {
		const stadium = new Environment();

		// builder có thể custom default config cho tournament
    return BattleLayoutBuilder.create().setEnvironment(stadium);
  }

  createDirector(builder: BattleLayoutBuilder) {
    return new TournamentBattleDirector(builder);
  }
}
