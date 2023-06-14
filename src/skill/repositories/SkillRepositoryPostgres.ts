import SkillRepository from '@/domains/skill/SkillRepository';
import { prisma } from '@/lib/prisma';
import { HTTPError, InternalServerError, NotFoundError } from '@/domains/error/ErrorEntity';
import { deleteCache, getCache, setCache } from '@/utils/redis';

import { Prisma, PrismaClient, Skill, SkillCategory } from '@prisma/client';

class SkillRepositoryPostgres implements SkillRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAllSkills(): Promise<Skill[]> {
    try {
      const skillsCache = await getCache<Skill[]>('skills');

      if (!skillsCache) {
        const skills = await prisma.skill.findMany({
          orderBy: [
            { categoryId: 'asc' },
            { id: 'asc' },
          ],
        });

        await setCache('skills', JSON.stringify(skills));

        return skills;
      }

      return skillsCache;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
      throw new InternalServerError('Failed to get all skills data');
    }
  }

  async getAllCategories(): Promise<SkillCategory[]> {
    try {
      const categoriesCache = await getCache<SkillCategory[]>('skillCategories');

      if (!categoriesCache) {
        const categories = await prisma.skillCategory.findMany({
          orderBy: { id: 'asc' },
        });
        await setCache('skillCategories', JSON.stringify(categories));

        return categories;
      }

      return categoriesCache;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
      throw new InternalServerError('Failed to get all skill categories data');
    }
  }

  async createSkill(skill: Prisma.SkillCreateInput) {
    try {
      const createdSkill = await this.prisma.skill.create({
        data: skill,
      });

      await deleteCache('skills');

      return createdSkill;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }

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

      await deleteCache('skills');

      return updatedSkill;
    } catch (error) {
      console.error(error);
      throw new InternalServerError(`Failed to update skill with id ${skillId}`);
    }
  }

  async deleteSkill(skillId: string): Promise<void> {
    try {
      await this.prisma.skill.delete({ where: { id: skillId } });

      await deleteCache('skills');
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

export const skillRepo = new SkillRepositoryPostgres(prisma);
