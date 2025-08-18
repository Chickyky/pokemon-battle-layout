import { BaseCircle, Environment, Pokemon, Trainer } from "@/components";

export class BattleLayout {
  constructor(
    public trainer?: Trainer,
    public trainerCompetitor?: Trainer,
    public pokemon?: Pokemon,
    public pokemonCompetitor?: Pokemon,
    public environment?: Environment,
    public baseCircle?: BaseCircle,
    public baseCircleCompetitor?: BaseCircle
  ) {}

  clone(): BattleLayout {
    return new BattleLayout(
      this.trainer,
      this.trainerCompetitor,
      this.pokemon,
      this.pokemonCompetitor,
      this.environment,
      this.baseCircle,
      this.baseCircleCompetitor
    );
  }
}