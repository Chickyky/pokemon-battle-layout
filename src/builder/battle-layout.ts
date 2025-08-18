import {BaseCircle, Environment, Pokemon, TextBox, Trainer} from '@/components';

export class BattleLayout {
  constructor(
    public environment?: Environment,

    public trainer?: Trainer,
    public pokemon?: Pokemon,
    public baseCircle?: BaseCircle,

    public trainerCompetitor?: Trainer,
    public pokemonCompetitor?: Pokemon,
    public baseCircleCompetitor?: BaseCircle,

    public textbox?: TextBox
  ) {}

  clone(): BattleLayout {
    return new BattleLayout(
      this.environment,

      this.trainer,
      this.pokemon,
      this.baseCircle,

      this.trainerCompetitor,
      this.pokemonCompetitor,
      this.baseCircleCompetitor,

      this.textbox
    );
  }
}
