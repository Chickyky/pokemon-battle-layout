import _ from 'lodash';

import {BaseComponent} from '@components/base.component';
import {ENVIRONMENTS} from '@components/resource.flat';
import { IEnvironment } from './environment.interface';

export class Environment extends BaseComponent {
  public id: string = '';
  public environmentPath = '';

  constructor() {
    super();

    const env = this.randomEnvironment();
    this.id = env.id;
    this.environmentPath = env.imagePath;
  }

  randomEnvironment(): IEnvironment {
    const env = _(ENVIRONMENTS)
      .sample() as IEnvironment;

    return env;
  }

  size() {
    return super.size(this.environmentPath);
  }

  toBuffer(): Promise<Buffer> {
    return super.toBuffer(this.environmentPath);
  }
}
