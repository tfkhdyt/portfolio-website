import { cacheRepo } from '@/cache/repositories/CacheRepositoryRedis';
import CacheRepository from '@/domains/cache/CacheRepository';
import { HTTPError, InternalServerError, NotFoundError } from '@/domains/error/ErrorEntity';
import { ProjectWithTechStack } from '@/domains/project/ProjectDto';
import ProjectRepository from '@/domains/project/ProjectRepository';
import { prisma } from '@/lib/prisma';

import { Prisma, PrismaClient, Project, ProjectCategory } from '@prisma/client';

class ProjectRepositoryPostgres implements ProjectRepository {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly cacheRepo: CacheRepository,
  ) {}

  async getAllProjectsFromDB(): Promise<ProjectWithTechStack[]> {
    try {
      const projects = await prisma.project.findMany({
        orderBy: { id: 'desc' },
        include: {
          techStack: {
            orderBy: [
              { categoryId: 'asc' },
              { id: 'asc' },
            ],
          },
        },
      });

      return projects;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }

      throw new InternalServerError('Failed to get all projects data from db');
    }
  }

  async getAllProjectsFromCache(): Promise<ProjectWithTechStack[] | null> {
    try {
      const projectsCache = await this.cacheRepo.get<ProjectWithTechStack[]>('projects');

      return projectsCache;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }

      throw new InternalServerError('Failed to get all projects data from cache');
    }
  }

  async getAllCategoriesFromDB(): Promise<ProjectCategory[]> {
    try {
      const categories = await prisma.projectCategory.findMany({
        orderBy: { id: 'asc' },
      });

      return categories;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }

      throw new InternalServerError('Failed to get all project categories data from db');
    }
  }

  async getAllCategoriesFromCache(): Promise<ProjectCategory[] | null> {
    try {
      const categoriesCache = await this.cacheRepo.get<ProjectCategory[]>('projectCategories');

      return categoriesCache;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }

      throw new InternalServerError('Failed to get all project categories data from cache');
    }
  }

  async createProject(project: Prisma.ProjectCreateInput) {
    try {
      const createdProject = await this.prisma.project.create({
        data: project,
      });

      return createdProject;
    } catch (error) {
      console.error(error);
      throw new InternalServerError('Failed to create new project');
    }
  }

  async getProjectCategoryById(categoryId: string): Promise<ProjectCategory> {
    try {
      const category = await this.prisma.projectCategory.findUnique({
        where: {
          id: categoryId,
        },
      });

      if (!category) {
        throw new NotFoundError(`Project category with id ${categoryId} is not found`);
      }

      return category;
    } catch (error) {
      console.error(error);

      if (error instanceof HTTPError) {
        throw error;
      }

      throw new InternalServerError('Failed to get project category');
    }
  }

  async updateProject(projectId: string, project: Prisma.ProjectUpdateInput): Promise<Project> {
    try {
      const updatedProject = await this.prisma.project.update({
        where: {
          id: projectId,
        },
        data: project,
      });

      return updatedProject;
    } catch (error) {
      console.error(error);
      throw new InternalServerError(`Failed to update project with id ${projectId}`);
    }
  }

  async deleteProject(projectId: string): Promise<void> {
    try {
      await this.prisma.project.delete({ where: { id: projectId } });
    } catch (error) {
      console.error(error);
      throw new InternalServerError(`Failed to delete project with id ${projectId}`);
    }
  }

  async getProjectById(projectId: string): Promise<Project> {
    try {
      const project = await this.prisma.project.findUnique({ where: { id: projectId } });
      if (!project) {
        throw new NotFoundError(`Project with id ${projectId} is not found`);
      }

      return project;
    } catch (error) {
      console.error(error);

      if (error instanceof HTTPError) {
        throw error;
      }

      throw new InternalServerError('Failed to get project');
    }
  }

  async disconnectTechStackBySkillId(skillId: string): Promise<void> {
    try {
      const projects = await this.prisma.project.findMany({
        where: {
          techStack: {
            some: {
              id: skillId,
            },
          },
        },
      });

      await Promise.all(projects.map((project) => (
        this.prisma.project.update({
          where: { id: project.id },
          data: {
            techStack: {
              disconnect: {
                id: skillId,
              },
            },
          },
        })
      )));
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }

      throw new InternalServerError('Failed to disconnect tech stack');
    }
  }
}

export const projectRepo = new ProjectRepositoryPostgres(prisma, cacheRepo);
