import dirTree from 'directory-tree';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

import {BaseComponent} from '@components/base.component';
import {resourceResolve} from '@/helpers';

import {TRAINNER_DIRECTION, TRAINNER_ROLE} from './trainner.constant';

export class Trainer extends BaseComponent {
  public isCompetitor: boolean = false;
  public role: keyof typeof TRAINNER_ROLE;
  public direction: TRAINNER_DIRECTION;
  public imagePath: string = '';
  public version: string = '';
  public name: string = '';

  private readonly resourcePath: string = resourceResolve(
    'characters/trainers'
  );
  private readonly resourceDirTree = dirTree(this.resourcePath, {
    extensions: /\.(png|jpg|jpeg)$/,
  });

  private trainerPath: string = resourceResolve(
    'characters/trainers/back/Heroes/0/frlg/0.png'
  );
  private competitorPath: string = resourceResolve(
    'characters/trainers/front/Heroes/1/frlg/0.png'
  );

  constructor(options: any = {}) {
    super();

    this.isCompetitor = !!options.isCompetitor;
    // fs.writeFileSync(path.join(process.cwd(), 'trainner-tree.json'), JSON.stringify(this.resourceDirTree));

    this.role = _.sample(Object.keys(TRAINNER_ROLE)) as keyof typeof TRAINNER_ROLE;
    this.direction = this.isCompetitor
      ? TRAINNER_DIRECTION.FRONT
      : TRAINNER_DIRECTION.BACK;

    const trainersInRole = _.chain(this?.resourceDirTree?.children || [])
      .find({name: this.direction})
      .thru((dir) => dir.children as any[])
      .find({name: TRAINNER_ROLE[this.role as keyof typeof TRAINNER_ROLE]})
      .thru((dir) => dir.children as any[])
      .value();

    const trainer = _.sample(trainersInRole) as any;
    const version = _.sample(trainer.children) as any;
    const trainerOfVersion = _.find(version.children, (child) => child.name.startsWith('0')) as any;

    this.name = trainer.name;
    this.version = version.name;
    this.imagePath = trainerOfVersion.path;

    console.log('trainner:', this.direction, this.role, this.name, this.version, this.imagePath);
  }

  randomTrainer(): string {
    return '';
  }

  size() {
    /* return this.isCompetitor
      ? super.size(this.competitorPath)
      : super.size(this.trainerPath); */

    return super.size(this.imagePath);
  }

  toBuffer(): Promise<Buffer> {
    /* return this.isCompetitor
      ? super.toBuffer(this.competitorPath)
      : super.toBuffer(this.trainerPath); */

    return super.toBuffer(this.imagePath);
  }

  getResourceTree() {
    return dirTree(this.resourcePath, {
      extensions: /\.(png|jpg|jpeg)$/,
    });
  }
}
