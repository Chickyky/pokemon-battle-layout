import {
  SpriteManager,
  RazorLeafAnimator,
  Trainer,
  Pokemon,
  TextBox,
  BattleLayoutDirector,
  RenderService,
  BattleLayoutBuilder,
} from '../src';

(async () => {
  const trainer = new Trainer();
  const competitorTrainer = new Trainer({isCompetitor: true});

  const pokemon = new Pokemon();
  const competitorPokemon = new Pokemon({isCompetitor: true});

  const textbox = new TextBox();

  /* const builder = new BattleLayoutBuilder(800, 800);
   */

  const builder = await BattleLayoutBuilder.create();

  builder
    .setTrainer(trainer)
    .setTrainer(competitorTrainer)
    .setPokemon(pokemon)
    .setPokemon(competitorPokemon)
    .setTextbox(textbox);

  const director = new BattleLayoutDirector(builder);
  let layout = director.constructBattle();
  const renderer = new RenderService(layout);

  // Load sprite sheet (giả sử sprite lá nằm ở index 0)
  const manager = await SpriteManager.load('fx/leaf1.png', 32, 32);

  const attackerRect = {x: 0, y: 100, width: 32, height: 32};
  const defenderRect = {x: 80, y: 0, width: 32, height: 32};
  const razorLeaf = new RazorLeafAnimator(
    manager,
    0,
    attackerRect,
    defenderRect
  )/*   as unknown as MoveAnimator; */

  await renderer.renderGif(razorLeaf, 'razor_leaf.gif');
})();
