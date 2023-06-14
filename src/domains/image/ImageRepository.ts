import { Image } from './ImageEntity';

export default interface ImageRepository {
  uploadImage(image: File, folder: string): Promise<Image>;
  deleteImage(photoId: string): Promise<void>;
}
