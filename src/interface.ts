export type RectPosition = {
  // x, y: top left
  x: number;
  y: number;
  width: number;
  height: number;
};

export type RectPoints = {
  topLeft: {x: number; y: number};
  topRight: {x: number; y: number};
  bottomLeft: {x: number; y: number};
  bottomRight: {x: number; y: number};
  center: {x: number; y: number};
  topCenter: {x: number; y: number};
  bottomCenter: {x: number; y: number};
  leftCenter: {x: number; y: number};
  rightCenter: {x: number; y: number};
};

export type Position = {x: number; y: number};
