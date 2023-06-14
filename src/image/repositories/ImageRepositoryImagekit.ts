import { InternalServerError } from '@/domains/error/ErrorEntity';
import { Image } from '@/domains/image/ImageEntity';
import ImageRepository from '@/domains/image/ImageRepository';
import { imagekit } from '@/lib/imagekit';

import ImageKit from 'imagekit';

class ImageRepositoryImagekit implements ImageRepository {
  constructor(private readonly imagekit: ImageKit) {}

  async uploadImage(image: File, folder: string): Promise<Image> {
    try {
      const { url, fileId } = await this.imagekit.upload({
        file: Buffer.from(await image.arrayBuffer()),
        fileName: image.name,
        folder,
      });

      return { photoUrl: url, photoId: fileId };
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }

      throw new InternalServerError('Failed to upload image');
    }
  }

  async deleteImage(photoId: string): Promise<void> {
    try {
      await this.imagekit.deleteFile(photoId);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }

      throw new InternalServerError(`Failed to delete image with id ${photoId}`);
    }
  }
}

export const imageRepo = new ImageRepositoryImagekit(imagekit);
