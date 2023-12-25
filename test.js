const { BattleLayoutBuilder, Environment, Trainer, Pokemon } = require('./dist');

;(async function main() {
	const enviroment = new Environment();
	const trainer = new Trainer();
	const enemyTrainer = new Trainer({ isEnemy: true });
	
	const pokemon = new Pokemon();
	const pokemonEnemy = new Pokemon({ isEnemy: true });


	const builder = new BattleLayoutBuilder(800, 800);

	await builder.setEnvironment(enviroment);
	await builder.setTrainer(trainer);
	await builder.setTrainer(enemyTrainer);
	
	await builder.setPokemon(pokemon);
	await builder.setPokemon(pokemonEnemy);

	builder.renderImage(`${__dirname}/test.png`);
})();
