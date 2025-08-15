import _ from 'lodash';
import { Image } from 'canvas';

import {BaseComponent} from '@components/base.component';

import {TRAINNER_DIRECTION, TRAINNER_ROLE} from './trainer.constant';
import {TRAINERS} from '@components/resource.flat';
import {ITraner} from './trainer.interface';

export class Trainer extends BaseComponent {
  public isCompetitor: boolean = false;
  public role: TRAINNER_ROLE;
  public direction: TRAINNER_DIRECTION;
  public imagePath: string = '';
  public version: string = '';
  public name: string = '';

  constructor(options: any = {}) {
    super();

    this.isCompetitor = !!options.isCompetitor;
    this.direction = this.isCompetitor
      ? TRAINNER_DIRECTION.FRONT
      : TRAINNER_DIRECTION.BACK;

    const trainer: ITraner = this.randomTrainer();

    this.name = trainer.name;
    this.version = trainer.version;
    this.imagePath = trainer.imagePath;
    this.role = trainer.role as TRAINNER_ROLE;

    console.log(
      'trainner:',
      this.direction,
      this.role,
      this.name,
      this.version,
    );
  }

  randomTrainer(): ITraner {
    const trainersInDirection = _(TRAINERS || [])
      .filter({direction: this.direction, pose: '0'})
      .value();
    const trainer: ITraner = _.sample(trainersInDirection) as ITraner;

    return trainer;
  }

  size() {
    return super.size(this.imagePath);
  }

  toBuffer(): Promise<Buffer> {
    return super.toBuffer(this.imagePath);
  }

  getImage(): Promise<Image> {
    return super.getImage(this.imagePath);
  }
}
