import SkillRepository from '@/domains/skill/SkillRepository';
import { HTTPError, InternalServerError, NotFoundError } from '@/utils/error';

import { Prisma, PrismaClient, SkillCategory } from '@prisma/client';

class SkillRepositoryPostgres implements SkillRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createSkill(skill: Prisma.SkillCreateInput) {
    try {
      const createdSkill = await this.prisma.skill.create({
        data: skill,
      });

      return createdSkill;
    } catch (error) {
      console.error(error);
      throw new InternalServerError('Failed to create new skill');
    }
  }

  async getSkillCategoryById(categoryId: string): Promise<SkillCategory> {
    try {
      const category = await this.prisma.skillCategory.findUnique({
        where: {
          id: categoryId,
        },
      });

      if (!category) {
        throw new NotFoundError(`Skill category with id ${categoryId} is not found`);
      }

      return category;
    } catch (error) {
      console.error(error);

      if (error instanceof HTTPError) {
        throw error;
      }

      throw new Error('Failed to get skill category');
    }
  }
}

export default SkillRepositoryPostgres;
