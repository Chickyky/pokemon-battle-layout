import dirTree from 'directory-tree';
import _ from 'lodash';

import {resourceResolve} from '@/helpers';
import {ITraner, TRAINNER_DIRECTION, TRAINNER_ROLE} from './trainer';
import {IBaseCircle} from './base-circle';
import {IEnvironment} from './environment';
import {IPokemon} from './pokemon';
import {ITextBox} from './text-box';

const trainerResourcePath: string = resourceResolve('characters/trainers');
const trainerResourceDirTree = dirTree(trainerResourcePath, {
  extensions: /\.(png|jpg|jpeg)$/,
});

const baseCircleResourcePath: string = resourceResolve('environment/bases');
const baseCircleResourceDirTree = dirTree(baseCircleResourcePath, {
  extensions: /\.(png|jpg|jpeg)$/,
});

const environmentResourcePath: string = resourceResolve(
  'environment/backgrounds'
);
const environmentResourceDirTree = dirTree(environmentResourcePath, {
  extensions: /\.(png|jpg|jpeg)$/,
});

const pokemonResourcePath: string = resourceResolve('pokemon');
const pokemonResourceDirTree = dirTree(pokemonResourcePath, {
  extensions: /\.(png|jpg|jpeg)$/,
});

const textboxResourcePath: string = resourceResolve('UI/textboxes');
const textboxResourceDirTree = dirTree(textboxResourcePath, {
  extensions: /\.(png|jpg|jpeg)$/,
});

function flattenWithParentProps(node: any, parentProps = {}): any[] {
  if (!_.isEmpty(parentProps)) {
    parentProps = _.mapKeys(parentProps, (_, key) => `parent.${key}`);
  }

  // Merge properties từ parent xuống (trừ children)
  const merged = _.merge({}, parentProps, _.omit(node, 'children'));

  if (!node.children || node.children.length === 0) {
    // Node là leaf → trả về 1 phần tử
    return [merged];
  }

  // Flatten tất cả children
  return _.flatMap(node.children, child =>
    flattenWithParentProps(child, merged)
  );
}

/*
{
	'parent.parent.parent.parent.path': '/Users/kiracle-be/Desktop/workspace/hobby/pokemon-battle-layout/dist/resources/characters/trainers/back',
	'parent.parent.parent.parent.name': 'back',
	'parent.parent.parent.path': '/Users/kiracle-be/Desktop/workspace/hobby/pokemon-battle-layout/dist/resources/characters/trainers/back/Allies',
	'parent.parent.parent.name': 'Allies',
	'parent.parent.path': '/Users/kiracle-be/Desktop/workspace/hobby/pokemon-battle-layout/dist/resources/characters/trainers/back/Allies/0',
	'parent.parent.name': '0',
	'parent.path': '/Users/kiracle-be/Desktop/workspace/hobby/pokemon-battle-layout/dist/resources/characters/trainers/back/Allies/0/dp',
	'parent.name': 'dp',
	path: '/Users/kiracle-be/Desktop/workspace/hobby/pokemon-battle-layout/dist/resources/characters/trainers/back/Allies/0/dp/0.png',
	name: '0.png'
}
*/

export const TRAINERS: ITraner[] = _.chain(
  trainerResourceDirTree.children || []
)
  .filter(dir =>
    [TRAINNER_DIRECTION.BACK, TRAINNER_DIRECTION.FRONT].includes(
      dir.name as TRAINNER_DIRECTION
    )
  )
  .flatMap(flattenWithParentProps)
  .map((flattened: any) => {
    const trainer: ITraner = {
      direction: _.get(
        flattened,
        'parent.parent.parent.parent.name'
      ) as TRAINNER_DIRECTION,
      role: _.get(
        flattened,
        'parent.parent.parent.name'
      ) as keyof typeof TRAINNER_ROLE,
      imagePath: _.get(flattened, 'path'),
      version: _.get(flattened, 'parent.name'),
      name: _.get(flattened, 'parent.parent.name'),
      pose: _.chain(flattened).get('name').split('.').head().value(),
    };

    return trainer;
  })
  .value();

const excludeBaseIds = [1, 3, 9, 11, 14, 16, 21];

/*
{
	'parent.path': '/Users/kiracle-be/Desktop/workspace/hobby/pokemon-battle-layout/dist/resources/environment/bases/0',
	'parent.name': '0',
	path: '/Users/kiracle-be/Desktop/workspace/hobby/pokemon-battle-layout/dist/resources/environment/bases/0/0.png',
	name: '0.png'
}
*/
export const BASE_CIRCLES: IBaseCircle[] = _.chain(
  baseCircleResourceDirTree.children || []
)
  .flatMap(flattenWithParentProps)
  .map((flattened: any) => {
    const baseCircle: IBaseCircle = {
      id: _.get(flattened, 'parent.name'),
      imagePath: _.get(flattened, 'path'),
      isCompetitor:
        _.chain(flattened).get('name').split('.').head().value() === '1',
    };

    return baseCircle;
  })
  .filter(baseCircle => !excludeBaseIds.includes(parseInt(baseCircle.id)))
  .value();

export const ENVIRONMENTS: IEnvironment[] = _.chain(
  environmentResourceDirTree.children || []
)
  .flatMap(flattenWithParentProps)
  .map((flattened: any) => {
    const environment: IEnvironment = {
      id: _.chain(flattened).get('name').split('.').head().value(),
      imagePath: _.get(flattened, 'path'),
    };

    return environment;
  })
  .value();

/*
{
  "parent.parent.parent.parent.path": "/Users/kiracle-be/Desktop/workspace/hobby/pokemon-battle-layout/dist/resources/pokemon/black-white",
  "parent.parent.parent.parent.name": "black-white",
  "parent.parent.parent.path": "/Users/kiracle-be/Desktop/workspace/hobby/pokemon-battle-layout/dist/resources/pokemon/black-white/back",
  "parent.parent.parent.name": "back",
  "parent.parent.path": "/Users/kiracle-be/Desktop/workspace/hobby/pokemon-battle-layout/dist/resources/pokemon/black-white/back/shiny",
  "parent.parent.name": "shiny",
  "parent.path": "/Users/kiracle-be/Desktop/workspace/hobby/pokemon-battle-layout/dist/resources/pokemon/black-white/back/shiny/female",
  "parent.name": "female",
  "path": "/Users/kiracle-be/Desktop/workspace/hobby/pokemon-battle-layout/dist/resources/pokemon/black-white/back/shiny/female/111.png",
  "name": "111.png"
}
*/

const excludeVersions = ['red-blue', 'red-green', 'yellow'];
const POKEMONS: IPokemon[] = _.chain(pokemonResourceDirTree.children || [])
  .flatMap(flattenWithParentProps)
  .map((flattened: any) => {
    const values = _.values(flattened);
    const version = _.get(
      flattened,
      'parent.parent.parent.parent.name',
      _.get(flattened, 'parent.name', null)
    );

    const pokemon: IPokemon = {
      id: _.chain(flattened).get('name').split('.').head().value(),
      imagePath: _.get(flattened, 'path'),
      direction: values.includes('back') ? 'back' : 'front',
      version: version,
      isFemale: values.includes('female'),
      isShiny: values.includes('shiny'),
    };

    return pokemon;
  })
  .filter(pokemon => !excludeVersions.includes(pokemon.version))
  .value();

export const POKEMONS_FRONT = _.filter(POKEMONS, {direction: 'front'});
export const POKEMONS_BACK = _.filter(POKEMONS, {direction: 'back'});

export const TEXTBOXES: ITextBox[] = _.chain(
  textboxResourceDirTree.children || []
)
  .flatMap(flattenWithParentProps)
  .map((flattened: any) => {
    const textbox: ITextBox = {
      id: _.chain(flattened).get('name').split('.').head().value(),
      imagePath: _.get(flattened, 'path'),
    };

    return textbox;
  })
  .value();
