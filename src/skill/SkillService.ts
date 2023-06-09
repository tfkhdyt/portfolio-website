import { CreateSkillRequest, UpdateSkillRequest } from '@/domains/skill/SkillDto';
import SkillRepository from '@/domains/skill/SkillRepository';
import { imagekit } from '@/lib/imagekit';
import { prisma } from '@/lib/prisma';
import { HTTPError, InternalServerError } from '@/utils/error';
import SkillRepositoryPostgres from './repositories/SkillRepositoryPostgres';

import ImageKit from 'imagekit';

class SkillService {
  constructor(private readonly skillRepo: SkillRepository, private readonly imagekit: ImageKit) {}

  private async verifyCategoryId(categoryId: string) {
    this.skillRepo.getSkillCategoryById(categoryId);
  }

  private async uploadImage(image: File, folder: string) {
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

  async createSkill(payload: CreateSkillRequest) {
    await this.verifyCategoryId(payload.categoryId);

    const { photoUrl, photoId } = await this.uploadImage(payload.photo, '/tech');

    const createdSkill = await this.skillRepo.createSkill({
      name: payload.name,
      photoUrl,
      photoId,
      category: {
        connect: {
          id: payload.categoryId,
        },
      },
    });

    return {
      message: 'New skill has been added',
      data: createdSkill,
    };
  }

  async updateSkill(skillId: string, payload: UpdateSkillRequest) {
    if (payload.categoryId) {
      await this.verifyCategoryId(payload.categoryId);
    }

    let photoUrl: string | undefined;
    let photoId: string | undefined;
    if (payload.photo) {
      const result = await this.uploadImage(payload.photo, '/tech');
      photoUrl = result.photoUrl;
      photoId = result.photoId;

      await this.deleteImage(photoId);
    }

    const updatedSkill = await this.skillRepo.updateSkill(skillId, {
      name: payload.name,
      category: {
        connect: {
          id: payload.categoryId,
        },
      },
      photoUrl,
      photoId,
    });

    return {
      message: `${updatedSkill.name} has been updated`,
    };
  }

  private async deleteImage(photoId: string) {
    try {
      await this.imagekit.deleteFile(photoId);
    } catch (error) {
      console.error(error);
      if (error instanceof HTTPError) {
        throw error;
      }
      throw new InternalServerError(`Failed to delete image with id ${photoId}`);
    }
  }
}

const skillRepo = new SkillRepositoryPostgres(prisma);

export const skillService = new SkillService(skillRepo, imagekit);
