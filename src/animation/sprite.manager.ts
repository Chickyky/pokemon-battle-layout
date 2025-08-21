import { loadImage, Image, CanvasRenderingContext2D } from "canvas";

import { ImageFlyweightFactory } from "@/components/image.flyweight-factory";
import { resourceResolve } from "@/helpers";

/**
 * Flyweight: giữ 1 bản sprite sheet duy nhất để tái sử dụng
 */
export class SpriteManager {
  private image: Image;
  private spriteWidth: number;
  private spriteHeight: number;
  private cols: number;

  private constructor(image: Image, spriteWidth: number, spriteHeight: number) {
    this.image = image;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.cols = Math.floor(image.width / spriteWidth);
  }

  /**
   * Factory method: tạo SpriteManager từ sheet
   */
  static async load(
    path: string,
    spriteWidth?: number,
    spriteHeight?: number
  ): Promise<SpriteManager> {
		path = resourceResolve(path);

    const image = await ImageFlyweightFactory.getImage(path);

		// return new SpriteManager(image, spriteWidth, spriteHeight);
		return new SpriteManager(image, image.width, image.height);
  }

  /**
   * Lấy sprite theo index (0-based)
   */
  drawSprite(
    ctx: CanvasRenderingContext2D,
    index: number,
    dx: number,
    dy: number,
    dw?: number,
    dh?: number
  ) {
    const col = index % this.cols;
    const row = Math.floor(index / this.cols);

    const sx = col * this.spriteWidth;
    const sy = row * this.spriteHeight;

    const drawWidth = dw ?? this.spriteWidth;
    const drawHeight = dh ?? this.spriteHeight;

    ctx.drawImage(
      this.image,
      sx,
      sy,
      this.spriteWidth,
      this.spriteHeight,
      dx,
      dy,
      drawWidth,
      drawHeight
    );
  }
}
