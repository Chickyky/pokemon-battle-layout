import { BaseComponent } from './base.component';

import { resourceResolve } from '../helpers';

export class Pokemon extends BaseComponent {
	isEnemy: boolean = false;

	private pkmPath = resourceResolve('pokemon/black-white/back/25.png');
	private pkmEnemyPath = resourceResolve('pokemon/black-white/25.png');

	constructor(options: any = {}) {
		super();
		
		this.isEnemy = !!options.isEnemy;
	}

	size() {
		return this.isEnemy ? super.size(this.pkmEnemyPath) : super.size(this.pkmPath);
	}

	toBuffer(): Promise<Buffer> {
		return this.isEnemy ? super.toBuffer(this.pkmEnemyPath) : super.toBuffer(this.pkmPath);
	}
}
