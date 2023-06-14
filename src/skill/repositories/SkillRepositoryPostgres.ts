import { cacheRepo } from '@/cache/repositories/CacheRepositoryRedis';
import CacheRepository from '@/domains/cache/CacheRepository';
import { HTTPError, InternalServerError, NotFoundError } from '@/domains/error/ErrorEntity';
import SkillRepository from '@/domains/skill/SkillRepository';
import { prisma } from '@/lib/prisma';

import { Prisma, PrismaClient, Skill, SkillCategory } from '@prisma/client';

class SkillRepositoryPostgres implements SkillRepository {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly cacheRepo: CacheRepository,
  ) {}

  async getAllSkillsFromDB(): Promise<Skill[]> {
    try {
      const skills = await prisma.skill.findMany({
        orderBy: [
          { categoryId: 'asc' },
          { id: 'asc' },
        ],
      });

      return skills;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }

      throw new InternalServerError('Failed to get all skills data from db');
    }
  }

  async getAllSkillsFromCache(): Promise<Skill[] | null> {
    try {
      const skillsCache = await this.cacheRepo.get<Skill[]>('skills');

      return skillsCache;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }

      throw new InternalServerError('Failed to get all skills data from cache');
    }
  }

  async getAllCategoriesFromDB(): Promise<SkillCategory[]> {
    try {
      const categories = await prisma.skillCategory.findMany({
        orderBy: [
          { id: 'asc' },
        ],
      });

      return categories;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }

      throw new InternalServerError('Failed to get all skill categories data from db');
    }
  }

  async getAllCategoriesFromCache(): Promise<SkillCategory[] | null> {
    try {
      const categoriesCache = await this.cacheRepo.get<SkillCategory[]>('skillCategories');

      return categoriesCache;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }

      throw new InternalServerError('Failed to get all skill categories data from cache');
    }
  }

  async createSkill(skill: Prisma.SkillCreateInput) {
    try {
      const createdSkill = await this.prisma.skill.create({
        data: skill,
      });

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

export const skillRepo = new SkillRepositoryPostgres(prisma, cacheRepo);
