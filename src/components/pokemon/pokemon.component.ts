import {BaseComponent} from '../base.component';

import {resourceResolve} from '../../helpers';

export class Pokemon extends BaseComponent {
  public isCompetitor: boolean = false;

  private pkmPath = resourceResolve('pokemon/black-white/back/25.png');
  private pkmCompetitorPath = resourceResolve('pokemon/black-white/25.png');

  constructor(options: any = {}) {
    super();

    this.isCompetitor = !!options.isCompetitor;
  }

  size() {
    return this.isCompetitor
      ? super.size(this.pkmCompetitorPath)
      : super.size(this.pkmPath);
  }

  toBuffer(): Promise<Buffer> {
    return this.isCompetitor
      ? super.toBuffer(this.pkmCompetitorPath)
      : super.toBuffer(this.pkmPath);
  }
}
