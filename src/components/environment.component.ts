import { BaseComponent } from './base.component';

import { resourceResolve } from '../helpers';

export class Environment extends BaseComponent {
	private environmentPath = resourceResolve('environment/backgrounds/0/0.png');

	constructor() {
		super();
	}

	size() {
		return super.size(this.environmentPath);
	}

	toBuffer(): Promise<Buffer> {
		return super.toBuffer(this.environmentPath);
	}
}
