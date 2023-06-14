import { InternalServerError } from '@/domains/error/ErrorEntity';

import { getPlaiceholder } from 'plaiceholder';

class LQIPRepositoryPlaiceholder {
  async getLQIP(image: File) {
    try {
      const { base64 } = await getPlaiceholder(Buffer.from(await image.arrayBuffer()));
      return base64;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }

      throw new InternalServerError('Failed to get LQIP');
    }
  }
}

export const lqipRepo = new LQIPRepositoryPlaiceholder();
