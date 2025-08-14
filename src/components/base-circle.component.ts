import {BaseComponent} from './base.component';

import {resourceResolve} from '../helpers';

export class BaseCircle extends BaseComponent {
  public isCompetitor: boolean = false;

  private baseCirclePath = resourceResolve('environment/bases/0/0.png');
  private baseCircleEnemyPath = resourceResolve('environment/bases/0/1.png');

  constructor(options: any = {}) {
    super();
    this.isCompetitor = !!options.isCompetitor;
  }

  size() {
    return this.isCompetitor
      ? super.size(this.baseCircleEnemyPath)
      : super.size(this.baseCirclePath);
  }

  toBuffer(): Promise<Buffer> {
    return this.isCompetitor
      ? super.toBuffer(this.baseCircleEnemyPath)
      : super.toBuffer(this.baseCirclePath);
  }
}
