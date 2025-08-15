const { BattleLayoutBuilder, Environment, Trainer, Pokemon } = require('./dist');

;(async function main() {
	const trainer = new Trainer();
	const competitorTrainer = new Trainer({ isCompetitor: true });

	const pokemon = new Pokemon();
	const competitorPokemon = new Pokemon({ isCompetitor: true });

	/* const builder = new BattleLayoutBuilder(800, 800);
	await builder.prepare(); */

	const builder = await BattleLayoutBuilder.create();

	await builder.setTrainer(trainer);
	await builder.setTrainer(competitorTrainer);
	await builder.setPokemon(pokemon);
	await builder.setPokemon(competitorPokemon);

	builder.renderImage(`${__dirname}/test.png`);
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
