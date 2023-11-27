const { BattleLayoutBuilder, Background } = require('./dist');

;(async function main() {
	const bg = new Background();
	const builder = new BattleLayoutBuilder(400, 400);

	await builder.setBackground(bg);

	builder.renderImage(`${__dirname}/test.png`);
})();
