import path from 'path';

import {RectPoints, RectPosition} from './interface';

export const resourceResolve = (pathResource: string = ''): string => {
  return path.resolve(__dirname, 'resources', pathResource);
};

export function getRectPoints(rect: RectPosition): RectPoints {
  const {x, y, width, height} = rect;

  return {
    topLeft: {x, y},
    topRight: {x: x + width, y},
    bottomLeft: {x, y: y + height},
    bottomRight: {x: x + width, y: y + height},
    center: {x: x + width / 2, y: y + height / 2},
    topCenter: {x: x + width / 2, y},
    bottomCenter: {x: x + width / 2, y: y + height},
    leftCenter: {x, y: y + height / 2},
    rightCenter: {x: x + width, y: y + height / 2},
  };
}
