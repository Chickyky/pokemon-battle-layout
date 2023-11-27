import { BaseComponent } from './base.component';

import { resourceResolve } from '../helpers';

export class Background extends BaseComponent {
	private bgAddress = resourceResolve('PBS.png');

	contructor() {

	}

	size() {
		return super.size(this.bgAddress);
	}

	toBuffer(): Promise<Buffer> {
		return super.toBuffer(this.bgAddress);
	}
}
