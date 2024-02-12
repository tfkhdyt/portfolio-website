import { cacheRepo } from '@/cache/repositories/CacheRepositoryRedis';
import CacheRepository from '@/domains/cache/CacheRepository';
import LQIPRepository from '@/domains/error/lqip/LQIPRepository';
import ImageRepository from '@/domains/image/ImageRepository';
import ProjectRepository from '@/domains/project/ProjectRepository';
import {
	CreateSkillRequest,
	UpdateSkillRequest,
} from '@/domains/skill/SkillDto';
import SkillRepository from '@/domains/skill/SkillRepository';
import { imageRepo } from '@/image/repositories/ImageRepositoryImagekit';
import { lqipRepo } from '@/lqip/repositories/LQIPRepositoryPlaiceholder';
import { projectRepo } from '@/project/repositories/ProjectRepositoryPostgres';
import { skillRepo } from './repositories/SkillRepositoryPostgres';

class SkillService {
	constructor(
		private readonly skillRepo: SkillRepository,
		private readonly imageRepo: ImageRepository,
		private readonly lqipRepo: LQIPRepository,
		private readonly cacheRepo: CacheRepository,
		private readonly projectRepo: ProjectRepository,
	) {}

	private async verifyCategoryId(categoryId: string) {
		this.skillRepo.getSkillCategoryById(categoryId);
	}

	async getAllSkills() {
		const skillsCache = await this.skillRepo.getAllSkillsFromCache();
		if (!skillsCache) {
			const skills = await this.skillRepo.getAllSkillsFromDB();
			await this.cacheRepo.set('skills', JSON.stringify(skills));

			return {
				message: 'success',
				data: skills,
			};
		}

		return {
			message: 'success',
			data: skillsCache,
		};
	}

	async getAllCategories() {
		const categoriesCache = await this.skillRepo.getAllCategoriesFromCache();
		if (!categoriesCache) {
			const categories = await this.skillRepo.getAllCategoriesFromDB();
			await this.cacheRepo.set('skillCategories', JSON.stringify(categories));

			return {
				message: 'success',
				data: categories,
			};
		}

		return {
			message: 'success',
			data: categoriesCache,
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

		await this.cacheRepo.delete('skills');

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

		await Promise.all([
			this.cacheRepo.delete('skills'),
			this.cacheRepo.delete('projects'),
		]);

		return {
			message: `${updatedSkill.name} has been updated`,
			data: updatedSkill,
		};
	}

	async deleteSkill(skillId: string) {
		const skill = await this.verifySkillAvailability(skillId);

		await this.projectRepo.disconnectTechStackBySkillId(skillId);

		await this.skillRepo.deleteSkill(skillId);

		await Promise.all([
			this.imageRepo.deleteImage(skill.photoId),
			this.cacheRepo.delete('skills'),
			this.cacheRepo.delete('projects'),
		]);

		return {
			message: `${skill.name} has been deleted`,
		};
	}
}

export const skillService = new SkillService(
	skillRepo,
	imageRepo,
	lqipRepo,
	cacheRepo,
	projectRepo,
);
