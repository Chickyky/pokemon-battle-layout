import _ from 'lodash';
import {Image} from 'canvas';

import {BaseComponent} from '@components/base.component';
import {BASE_CIRCLES} from '@components/resource.flat';

import {IBaseCircle} from './base-circle.interface';

export class BaseCircle extends BaseComponent {
  public isCompetitor: boolean = false;
  public id: string = '';
  public baseCirclePath: string = '';

  constructor(options: any = {}) {
    super();
    this.isCompetitor = !!options.isCompetitor;

    const baseCircle = this.randomBaseCircle();
    this.id = baseCircle.id;
    this.baseCirclePath = baseCircle.imagePath;
  }

  randomBaseCircle(): IBaseCircle {
    const baseCircle = _(BASE_CIRCLES)
      .filter({isCompetitor: this.isCompetitor})
      .sample() as IBaseCircle;

    return baseCircle;
  }

  size() {
    return super.size(this.baseCirclePath);
  }

  toBuffer(): Promise<Buffer> {
    return super.toBuffer(this.baseCirclePath);
  }

  getImage(): Promise<Image> {
    return super.getImage(this.baseCirclePath);
  }
}
