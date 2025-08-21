import { BattleLayout } from "../battle-layout";
import { BattleLayoutDirector } from "../battle-layout.director";

import { Environment } from "@/components";

export class BossBattleDirector extends BattleLayoutDirector {
	construct(): BattleLayout {
		this.builder.setEnvironment(new Environment());

		return this.builder
			.build();
	}
}
