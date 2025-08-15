import path from 'path';

export const resourceResolve = (pathResource: string = ''): string => {
  return path.resolve(__dirname, 'resources', pathResource);
};
