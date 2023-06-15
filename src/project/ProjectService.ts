import { cacheRepo } from '@/cache/repositories/CacheRepositoryRedis';
import CacheRepository from '@/domains/cache/CacheRepository';
import LQIPRepository from '@/domains/error/lqip/LQIPRepository';
import ImageRepository from '@/domains/image/ImageRepository';
import { CreateProjectRequest, UpdateProjectRequest } from '@/domains/project/ProjectDto';
import ProjectRepository from '@/domains/project/ProjectRepository';
import { imageRepo } from '@/image/repositories/ImageRepositoryImagekit';
import { lqipRepo } from '@/lqip/repositories/LQIPRepositoryPlaiceholder';
import { projectRepo } from './repositories/ProjectRepositoryPostgres';

class ProjectService {
  constructor(
    private readonly projectRepo: ProjectRepository,
    private readonly imageRepo: ImageRepository,
    private readonly lqipRepo: LQIPRepository,
    private readonly cacheRepo: CacheRepository,
  ) {}

  private async verifyCategoryId(categoryId: string) {
    this.projectRepo.getProjectCategoryById(categoryId);
  }

  async getAllProjects() {
    const projectsCache = await this.projectRepo.getAllProjectsFromCache();
    if (!projectsCache) {
      const projects = await this.projectRepo.getAllProjectsFromDB();
      await this.cacheRepo.set('projects', JSON.stringify(projects));

      return {
        message: 'success',
        data: projects,
      };
    }

    return {
      message: 'success',
      data: projectsCache,
    };
  }

  async getAllCategories() {
    const categoriesCache = await this.projectRepo.getAllCategoriesFromCache();
    if (!categoriesCache) {
      const categories = await this.projectRepo.getAllCategoriesFromDB();
      await this.cacheRepo.set('projectCategories', JSON.stringify(categories));

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

  async createProject(payload: CreateProjectRequest) {
    await this.verifyCategoryId(payload.categoryId);

    const [{ photoUrl, photoId }, lqip] = await Promise.all([
      this.imageRepo.uploadImage(payload.photo, '/projects'),
      this.lqipRepo.getLQIP(payload.photo),
    ]);

    const createdProject = await this.projectRepo.createProject({
      name: payload.name,
      desc: payload.desc,
      photoId,
      photoUrl,
      lqip,
      repoUrl: payload.repoUrl,
      demoUrl: payload.demoUrl,
      category: {
        connect: {
          id: payload.categoryId,
        },
      },
      techStack: {
        connect: payload.techStack.map((tech) => ({ id: tech })),
      },
    });

    await this.cacheRepo.delete('projects');

    return {
      message: `${createdProject.name} has been added`,
      data: createdProject,
    };
  }

  private async verifyProjectAvailability(projectId: string) {
    return this.projectRepo.getProjectById(projectId);
  }

  async updateProject(projectId: string, payload: UpdateProjectRequest) {
    const oldProject = await this.verifyProjectAvailability(projectId);

    if (payload.categoryId) {
      await this.verifyCategoryId(payload.categoryId);
    }

    let photoUrl: string | undefined;
    let photoId: string | undefined;
    let lqip: string | undefined;
    if (payload.photo) {
      const [result, base64] = await Promise.all([
        this.imageRepo.uploadImage(payload.photo, '/projects'),
        this.lqipRepo.getLQIP(payload.photo),
      ]);

      photoUrl = result.photoUrl;
      photoId = result.photoId;
      lqip = base64;
    }

    const updatedProject = await this.projectRepo.updateProject(projectId, {
      name: payload.name,
      desc: payload.desc,
      photoUrl,
      photoId,
      lqip,
      repoUrl: payload.repoUrl,
      demoUrl: payload.demoUrl,
      category: {
        connect: {
          id: payload.categoryId,
        },
      },
      techStack: {
        set: payload.techStack?.map((tech) => ({
          id: tech,
        })),
      },
    });

    await this.cacheRepo.delete('projects');

    if (photoId) {
      await this.imageRepo.deleteImage(oldProject.photoId);
    }

    return {
      message: `${updatedProject.name} has been updated`,
      data: updatedProject,
    };
  }

  async deleteProject(projectId: string) {
    const project = await this.verifyProjectAvailability(projectId);

    await this.projectRepo.deleteProject(projectId);

    await Promise.all([
      this.imageRepo.deleteImage(project.photoId),
      this.cacheRepo.delete('projects'),
    ]);

    return {
      message: `${project.name} has been deleted`,
    };
  }
}

export const projectService = new ProjectService(
  projectRepo,
  imageRepo,
  lqipRepo,
  cacheRepo,
);
