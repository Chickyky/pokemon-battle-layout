import { Environment } from "@/components";
import { BattleLayoutBuilder } from "../battle-layout.builder";
import { BattleFactory } from "./battle.factory";
import { BossBattleDirector } from "../directors";

export class BossBattleFactory implements BattleFactory {
  createBuilder(): BattleLayoutBuilder {
		const sceneDark = new Environment();

    return BattleLayoutBuilder.create().setEnvironment(sceneDark);
  }

  createDirector(builder: BattleLayoutBuilder) {
    return new BossBattleDirector(builder);
  }
}
