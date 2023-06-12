import SkillRepository from '@/domains/skill/SkillRepository';
import { HTTPError, InternalServerError, NotFoundError } from '@/utils/error';

import { Prisma, PrismaClient, Skill, SkillCategory } from '@prisma/client';

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

      throw new InternalServerError('Failed to get skill category');
    }
  }

  async updateSkill(skillId: string, skill: Prisma.SkillUpdateInput): Promise<Skill> {
    try {
      const updatedSkill = await this.prisma.skill.update({
        where: {
          id: skillId,
        },
        data: skill,
      });

      return updatedSkill;
    } catch (error) {
      console.error(error);
      throw new InternalServerError(`Failed to update skill with id ${skillId}`);
    }
  }

  async deleteSkill(skillId: string): Promise<void> {
    try {
      await this.prisma.skill.delete({ where: { id: skillId } });
    } catch (error) {
      console.error(error);
      throw new InternalServerError(`Failed to delete skill with id ${skillId}`);
    }
  }

  async getSkillById(skillId: string): Promise<Skill> {
    try {
      const skill = await this.prisma.skill.findUnique({ where: { id: skillId } });
      if (!skill) {
        throw new NotFoundError(`Skill with id ${skillId} is not found`);
      }

      return skill;
    } catch (error) {
      console.error(error);
      if (error instanceof HTTPError) {
        throw error;
      }
      throw new InternalServerError('Failed to get skill');
    }
  }
}

export default SkillRepositoryPostgres;
