import { handleError } from '@/helpers/error';

import { getPlaiceholder } from 'plaiceholder';

class LQIPRepositoryPlaiceholder {
  async getLQIP(image: File) {
    try {
      const { base64 } = await getPlaiceholder(Buffer.from(await image.arrayBuffer()));
      return base64;
    } catch (error) {
      throw handleError(error);
    }
  }
}

export const lqipRepo = new LQIPRepositoryPlaiceholder();
