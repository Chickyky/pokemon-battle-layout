import { BaseComponent } from './base.component';

import { resourceResolve } from '../helpers';

export class BaseCircle extends BaseComponent {
	isEnemy: boolean = false;

	private baseCirclePath = resourceResolve('environment/bases/0/0.png');
	private baseCircleEnemyPath = resourceResolve('environment/bases/0/1.png');

	constructor(options: any = {}) {
		super();
		this.isEnemy = !!options.isEnemy;
	}

	size() {
		return this.isEnemy ? super.size(this.baseCircleEnemyPath) : super.size(this.baseCirclePath);
	}

	toBuffer(): Promise<Buffer> {
		return this.isEnemy ? super.toBuffer(this.baseCircleEnemyPath) : super.toBuffer(this.baseCirclePath);
	}
}
