const { BattleLayoutBuilder } = require('./dist');


;(async function main() {
	const builder = new BattleLayoutBuilder(400, 400);

	await builder.setBackground();

	builder.renderImage(`${__dirname}/test.png`);
})();
