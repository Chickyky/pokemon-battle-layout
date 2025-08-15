import {loadImage, Image} from 'canvas';

export class ImageFlyweightFactory {
  private static cache: Map<string, Promise<Image>> = new Map();

  static getImage(pathOrUrl: string): Promise<Image> {
    if (!this.cache.has(pathOrUrl)) {
      this.cache.set(pathOrUrl, loadImage(pathOrUrl));
    }

    return this.cache.get(pathOrUrl)!;
  }
}
