import { CreateSkillRequest } from '@/domains/skill/SkillDto';
import SkillRepository from '@/domains/skill/SkillRepository';
import { imagekit } from '@/lib/imagekit';
import { prisma } from '@/lib/prisma';
import { HTTPError } from '@/utils/error';
import SkillRepositoryPostgres from './repositories/SkillRepositoryPostgres';

import ImageKit from 'imagekit';

class SkillService {
  constructor(private readonly skillRepo: SkillRepository, private readonly imagekit: ImageKit) {}

  private async verifyCategoryId(categoryId: string) {
    try {
      await this.skillRepo.getSkillCategoryById(categoryId);
    } catch (error) {
      if (error instanceof HTTPError) {
        throw error;
      }

      throw new Error('Failed to verify category id');
    }
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
        throw new Error(error.message);
      }

      throw new Error('Failed to upload image');
    }
  }

  async createSkill(payload: CreateSkillRequest) {
    try {
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
    } catch (error) {
      if (error instanceof HTTPError) {
        throw error;
      }

      throw new Error('Failed to create new skill');
    }
  }
}

const skillRepo = new SkillRepositoryPostgres(prisma);

export const skillService = new SkillService(skillRepo, imagekit);
