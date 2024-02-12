import { cacheRepo } from '@/cache/repositories/CacheRepositoryRedis';
import CacheRepository from '@/domains/cache/CacheRepository';
import { NotFoundError } from '@/domains/error/ErrorEntity';
import SkillRepository from '@/domains/skill/SkillRepository';
import { handleError } from '@/helpers/error';
import { prisma } from '@/lib/prisma';

import { Prisma, PrismaClient, Skill, SkillCategory } from '@prisma/client';

class SkillRepositoryPostgres implements SkillRepository {
	constructor(
		private readonly db: PrismaClient,
		private readonly cacheRepo: CacheRepository,
	) {}

	async getAllSkillsFromDB(): Promise<Skill[]> {
		try {
			const skills = await this.db.skill.findMany({
				orderBy: [{ categoryId: 'asc' }, { id: 'asc' }],
			});

			return skills;
		} catch (error) {
			throw handleError(error);
		}
	}

	async getAllSkillsFromCache(): Promise<Skill[] | null> {
		try {
			const skillsCache = await this.cacheRepo.get<Skill[]>('skills');

			return skillsCache;
		} catch (error) {
			throw handleError(error);
		}
	}

	async getAllCategoriesFromDB(): Promise<SkillCategory[]> {
		try {
			const categories = await this.db.skillCategory.findMany({
				orderBy: [{ id: 'asc' }],
			});

			return categories;
		} catch (error) {
			throw handleError(error);
		}
	}

	async getAllCategoriesFromCache(): Promise<SkillCategory[] | null> {
		try {
			const categoriesCache =
				await this.cacheRepo.get<SkillCategory[]>('skillCategories');

			return categoriesCache;
		} catch (error) {
			throw handleError(error);
		}
	}

	async createSkill(skill: Prisma.SkillCreateInput) {
		try {
			const createdSkill = await this.db.skill.create({
				data: skill,
			});

			return createdSkill;
		} catch (error) {
			throw handleError(error);
		}
	}

	async getSkillCategoryById(categoryId: string): Promise<SkillCategory> {
		try {
			const category = await this.db.skillCategory.findUnique({
				where: {
					id: categoryId,
				},
			});

			if (!category) {
				throw new NotFoundError(
					`Skill category with id ${categoryId} is not found`,
				);
			}

			return category;
		} catch (error) {
			throw handleError(error);
		}
	}

	async updateSkill(
		skillId: string,
		skill: Prisma.SkillUpdateInput,
	): Promise<Skill> {
		try {
			const updatedSkill = await this.db.skill.update({
				where: {
					id: skillId,
				},
				data: skill,
			});

			return updatedSkill;
		} catch (error) {
			throw handleError(error);
		}
	}

	async deleteSkill(skillId: string): Promise<void> {
		try {
			await this.db.skill.delete({ where: { id: skillId } });
		} catch (error) {
			throw handleError(error);
		}
	}

	async getSkillById(skillId: string): Promise<Skill> {
		try {
			const skill = await this.db.skill.findUnique({ where: { id: skillId } });
			if (!skill) {
				throw new NotFoundError(`Skill with id ${skillId} is not found`);
			}

			return skill;
		} catch (error) {
			throw handleError(error);
		}
	}
}

export const skillRepo = new SkillRepositoryPostgres(prisma, cacheRepo);
