import LQIPRepository from '@/domains/error/lqip/LQIPRepository';
import ImageRepository from '@/domains/image/ImageRepository';
import { CreateSkillRequest, UpdateSkillRequest } from '@/domains/skill/SkillDto';
import SkillRepository from '@/domains/skill/SkillRepository';
import { imageRepo } from '@/image/repositories/ImageRepositoryImagekit';
import { lqipRepo } from '@/lqip/repositories/LQIPRepositoryPlaiceholder';
import { skillRepo } from './repositories/SkillRepositoryPostgres';

class SkillService {
  constructor(
    private readonly skillRepo: SkillRepository,
    private readonly imageRepo: ImageRepository,
    private readonly lqipRepo: LQIPRepository,
  ) {}

  private async verifyCategoryId(categoryId: string) {
    this.skillRepo.getSkillCategoryById(categoryId);
  }

  async getAllSkills() {
    const skills = await skillRepo.getAllSkills();

    return {
      message: 'success',
      data: skills,
    };
  }

  async getAllCategories() {
    const categories = await skillRepo.getAllCategories();

    return {
      message: 'success',
      data: categories,
    };
  }

  async createSkill(payload: CreateSkillRequest) {
    await this.verifyCategoryId(payload.categoryId);

    const [{ photoUrl, photoId }, lqip] = await Promise.all([
      this.imageRepo.uploadImage(payload.photo, '/tech'),
      this.lqipRepo.getLQIP(payload.photo),
    ]);

    const createdSkill = await this.skillRepo.createSkill({
      name: payload.name,
      photoUrl,
      photoId,
      lqip,
      category: {
        connect: {
          id: payload.categoryId,
        },
      },
    });

    return {
      message: `${createdSkill.name} has been added`,
      data: createdSkill,
    };
  }

  private async verifySkillAvailability(skillId: string) {
    return this.skillRepo.getSkillById(skillId);
  }

  async updateSkill(skillId: string, payload: UpdateSkillRequest) {
    const oldSkill = await this.verifySkillAvailability(skillId);

    if (payload.categoryId) {
      await this.verifyCategoryId(payload.categoryId);
    }

    let photoUrl: string | undefined;
    let photoId: string | undefined;
    let lqip: string | undefined;
    if (payload.photo) {
      const [result, base64] = await Promise.all([
        this.imageRepo.uploadImage(payload.photo, '/tech'),
        this.lqipRepo.getLQIP(payload.photo),
      ]);

      photoUrl = result.photoUrl;
      photoId = result.photoId;
      lqip = base64;
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
      lqip,
    });

    if (photoId) {
      await this.imageRepo.deleteImage(oldSkill.photoId);
    }

    return {
      message: `${updatedSkill.name} has been updated`,
      data: updatedSkill,
    };
  }

  async deleteSkill(skillId: string) {
    const skill = await this.verifySkillAvailability(skillId);
    await this.skillRepo.deleteSkill(skillId);
    await this.imageRepo.deleteImage(skill.photoId);

    return {
      message: `${skill.name} has been deleted`,
    };
  }
}

export const skillService = new SkillService(skillRepo, imageRepo, lqipRepo);
