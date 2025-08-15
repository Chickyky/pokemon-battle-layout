import _ from 'lodash';
import { Image } from 'canvas';

import {BaseComponent} from '@components/base.component';

import { POKEMONS_FRONT, POKEMONS_BACK } from '@components/resource.flat';
import { IPokemon } from './pokemon.interface';

export class Pokemon extends BaseComponent {
  public isCompetitor: boolean = false;
  public id: string = '';
  public imagePath: string = '';
  public direction: string = '';
  public version: string = '';
  public isFemale: boolean = false;
  public isShiny: boolean = false;

  constructor(options: any = {}) {
    super();

    this.isCompetitor = !!options.isCompetitor;

    const pokemon = this.randomPokemon();

    this.id = pokemon.id;
    this.imagePath = pokemon.imagePath;
    this.direction = pokemon.direction;
    this.version = pokemon.version;
    this.isFemale = pokemon.isFemale;
    this.isShiny = pokemon.isShiny;
  }

  randomPokemon(): IPokemon {
    const list = this.isCompetitor ? POKEMONS_FRONT : POKEMONS_BACK;
    const pokemon = _(list)
      .sample() as IPokemon;

    return pokemon;
  }

  size() {
    return super.size(this.imagePath);
  }

  toBuffer(): Promise<Buffer> {
    return super.toBuffer(this.imagePath);
  }

  getImage(): Promise<Image> {
    return super.getImage(this.imagePath);
  }
}
