import { CreateSkillRequest, UpdateSkillRequest } from '@/domains/skill/SkillDto';
import SkillRepository from '@/domains/skill/SkillRepository';
import { deleteImage, uploadImage } from '@/utils/imagekit';
import { getLQIP } from '@/utils/plaiceholder';
import { skillRepo } from './repositories/SkillRepositoryPostgres';

class SkillService {
  constructor(
    private readonly skillRepo: SkillRepository,
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

    const { photoUrl, photoId } = await uploadImage(payload.photo, '/tech');
    const lqip = await getLQIP(payload.photo);

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
      const result = await uploadImage(payload.photo, '/tech');
      photoUrl = result.photoUrl;
      photoId = result.photoId;

      lqip = await getLQIP(payload.photo);
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
      await deleteImage(oldSkill.photoId);
    }

    return {
      message: `${updatedSkill.name} has been updated`,
      data: updatedSkill,
    };
  }

  async deleteSkill(skillId: string) {
    const skill = await this.verifySkillAvailability(skillId);
    await this.skillRepo.deleteSkill(skillId);
    await deleteImage(skill.photoId);

    return {
      message: `${skill.name} has been deleted`,
    };
  }
}

export const skillService = new SkillService(skillRepo);
