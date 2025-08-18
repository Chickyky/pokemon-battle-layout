import {Image} from 'canvas';
import _ from 'lodash';

import {BaseComponent} from '@components/base.component';
import {TEXTBOXES} from '@components/resource.flat';
import {ITextBox} from './text-box.interface';

export class TextBox extends BaseComponent {
  public id: string = '';
  public imagePath: string = '';

  constructor() {
    super();

    const textbox = this.randomTextbox();
    this.id = textbox.id;
    this.imagePath = textbox.imagePath;
  }

  randomTextbox(): ITextBox {
    const textbox = _(TEXTBOXES).sample() as ITextBox;

    return textbox;
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
