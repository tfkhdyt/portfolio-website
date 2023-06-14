import { InternalServerError } from '@/domains/error/ErrorEntity';
import { imagekit } from '@/lib/imagekit';

export const uploadImage = async (image: File, folder: string) => {
  try {
    const { url, fileId } = await imagekit.upload({
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
};

export const deleteImage = async (photoId: string) => {
  try {
    await imagekit.deleteFile(photoId);
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      throw new InternalServerError(error.message);
    }

    throw new InternalServerError(`Failed to delete image with id ${photoId}`);
  }
};
