import * as path from 'path';

export const resourceResolve = (pathResource: string = '') => {
	return path.resolve(__dirname, 'resources', pathResource);
}
