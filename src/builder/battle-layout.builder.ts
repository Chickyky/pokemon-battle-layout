
import { IBuilder } from './builder.interface';
import { Environment, Trainer, Pokemon, BaseCircle } from '@components';

// TODO: add interface for options
// TODO: add more resolutions and render image (buffer/base64/...)

export class BattleLayoutBuilder implements IBuilder {
  public environment: Environment;

  public baseCircle: BaseCircle;
  public trainer: Trainer | undefined;
  public pokemon: Pokemon | undefined;

  public competitorBaseCircle: BaseCircle;
  public competitorTrainer: Trainer | undefined;
  public competitorPokemon: Pokemon | undefined;

  constructor() {
    this.environment = new Environment();
    this.baseCircle = new BaseCircle();
    this.competitorBaseCircle = new BaseCircle({isCompetitor: true});
  }

  static async create() {
    const builder = new BattleLayoutBuilder();
    return builder;
  }

  reset() {}

  setEnvironment(environment: Environment) {
    this.environment = environment;
    return this;
  }

  setTrainer(trainer: Trainer) {
    if (trainer.isCompetitor) return this.setCompetitorTrainer(trainer);

    return this.setSelfTrainer(trainer);
  }

  setSelfTrainer(trainer: Trainer) {
    this.trainer = trainer;
    return this;
  }

  setCompetitorTrainer(trainer: Trainer) {
    this.competitorTrainer = trainer;
    return this;
  }

  setPokemon(pokemon: Pokemon) {
    if (pokemon.isCompetitor) return this.setCompetitorPokemon(pokemon);

    return this.setSelfPokemon(pokemon);
  }

  setSelfPokemon(pokemon: Pokemon) {
    this.pokemon = pokemon;
    return this;
  }

  setCompetitorPokemon(pokemon: Pokemon) {
    this.competitorPokemon = pokemon;
    return this;
  }

  setCompetitorBaseCircle(baseCircle: BaseCircle) {
    this.competitorBaseCircle = baseCircle;
    return this;
  }

  setSelfBaseCircle(baseCircle: BaseCircle) {
    this.baseCircle = baseCircle;
    return this;
  }
}
