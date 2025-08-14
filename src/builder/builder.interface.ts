import {Environment, Trainer, Pokemon} from '@/components';

export interface IBuilder {
  reset(): void;
  setEnvironment(env: Environment): void;
  setTrainer(trainer: Trainer): void;
  setPokemon(pokeon: Pokemon): void;
  render(): void;
}
