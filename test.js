const { BattleLayoutBuilder, Environment, Trainer, Pokemon, BattleLayoutDirector } = require('./dist');

;(async function main() {
	const trainer = new Trainer();
	const competitorTrainer = new Trainer({ isCompetitor: true });

	const pokemon = new Pokemon();
	const competitorPokemon = new Pokemon({ isCompetitor: true });

	/* const builder = new BattleLayoutBuilder(800, 800);
	*/

	const builder = await BattleLayoutBuilder.create();

	builder
		.setTrainer(trainer)
		.setTrainer(competitorTrainer)
		.setPokemon(pokemon)
		.setPokemon(competitorPokemon)

	const director = new BattleLayoutDirector(builder);

	await director.renderImage(`${__dirname}/test.png`);

	builder
		.setTrainer(new Trainer())
		.setPokemon(new Pokemon());

	await director.renderImage(`${__dirname}/test2.png`);
})();


// const GIFEncoder = require('gifencoder');
// const encoder = new GIFEncoder(854, 480);
// const pngFileStream = require('png-file-stream');
// const fs = require('fs');

// const stream = pngFileStream('test/**/frame?.png')
//   .pipe(encoder.createWriteStream({ repeat: -1, delay: 500, quality: 10 }))
//   .pipe(fs.createWriteStream('myanimated.gif'));

// stream.on('finish', function () {
//   // Process generated GIF
// });

// // Alternately, you can wrap the "finish" event in a Promise
// await new Promise((resolve, reject) => {
//   stream.on('finish', resolve);
//   stream.on('error', reject);
// });
