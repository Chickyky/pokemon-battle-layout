import {Environment, Trainer, Pokemon} from '@/components';

export interface IBuilder {
  reset(): void;
  setEnvironment(env: Environment): this;
  setTrainer(trainer: Trainer): this;
  setPokemon(pokeon: Pokemon): this;
}
