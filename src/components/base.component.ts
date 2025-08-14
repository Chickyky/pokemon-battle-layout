const gm = require('gm');

export class BaseComponent {
  toBuffer(imgAddress: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      gm(imgAddress).toBuffer('PNG', (err: any, buffer: Buffer) => {
        if (err) return reject(err);
        return resolve(buffer);
      });
    });
  }

  size(imgAddress: string): Promise<{width: number; height: number}> {
    return new Promise((resolve, reject) => {
      gm(imgAddress).size((err: any, value: any) => {
        if (err) return reject(err);

        const {width, height} = value;

        return resolve({width, height});
      });
    });
  }
}
