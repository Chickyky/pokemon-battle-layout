import {BaseComponent} from './base.component';

import {resourceResolve} from '../helpers';

export class Trainer extends BaseComponent {
  public isCompetitor: boolean = false;

  private trainer = resourceResolve(
    'characters/trainers/back/Heroes/0/frlg/0.png'
  );
  private enemy = resourceResolve(
    'characters/trainers/front/Heroes/1/frlg/0.png'
  );

  constructor(options: any = {}) {
    super();

    this.isCompetitor = !!options.isCompetitor;
  }

  size() {
    return this.isCompetitor
      ? super.size(this.enemy)
      : super.size(this.trainer);
  }

  toBuffer(): Promise<Buffer> {
    return this.isCompetitor
      ? super.toBuffer(this.enemy)
      : super.toBuffer(this.trainer);
  }
}
