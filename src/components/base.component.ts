import {Image} from 'canvas';
import gm from 'gm';

import {ImageFlyweightFactory} from '@components/image.flyweight-factory';

export class BaseComponent {
  async toBuffer(imgAddress: string): Promise<Buffer> {
    const image = await ImageFlyweightFactory.getImage(imgAddress);

    return image.src as Buffer;
  }

  async size(imgAddress: string): Promise<{width: number; height: number}> {
    const image = await ImageFlyweightFactory.getImage(imgAddress);

    return {width: image.width, height: image.height};
  }

  async getImage(imgAddress: string): Promise<Image> {
    return ImageFlyweightFactory.getImage(imgAddress);
  }
}
