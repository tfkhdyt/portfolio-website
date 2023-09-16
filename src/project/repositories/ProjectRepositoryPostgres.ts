import { cacheRepo } from '@/cache/repositories/CacheRepositoryRedis';
import CacheRepository from '@/domains/cache/CacheRepository';
import { NotFoundError } from '@/domains/error/ErrorEntity';
import { ProjectWithTechStack } from '@/domains/project/ProjectDto';
import ProjectRepository from '@/domains/project/ProjectRepository';
import { handleError } from '@/helpers/error';
import { prisma } from '@/lib/prisma';

import { Prisma, PrismaClient, Project, ProjectCategory } from '@prisma/client';

class ProjectRepositoryPostgres implements ProjectRepository {
  constructor(
    private readonly db: PrismaClient,
    private readonly cacheRepo: CacheRepository,
  ) { }

  async getAllProjectsFromDB(): Promise<ProjectWithTechStack[]> {
    try {
      const projects = await this.db.project.findMany({
        orderBy: { id: 'desc' },
        include: {
          techStack: {
            orderBy: [{ categoryId: 'asc' }, { id: 'asc' }],
          },
          category: {
            select: {
              name: true,
            },
          },
        },
      });

      return projects;
    } catch (error) {
      throw handleError(error);
    }
  }

  async getAllProjectsFromCache(): Promise<ProjectWithTechStack[] | null> {
    try {
      const projectsCache =
        await this.cacheRepo.get<ProjectWithTechStack[]>('projects');

      return projectsCache;
    } catch (error) {
      throw handleError(error);
    }
  }

  async getAllCategoriesFromDB(): Promise<ProjectCategory[]> {
    try {
      const categories = await this.db.projectCategory.findMany({
        orderBy: { id: 'asc' },
      });

      return categories;
    } catch (error) {
      throw handleError(error);
    }
  }

  async getAllCategoriesFromCache(): Promise<ProjectCategory[] | null> {
    try {
      const categoriesCache =
        await this.cacheRepo.get<ProjectCategory[]>('projectCategories');

      return categoriesCache;
    } catch (error) {
      throw handleError(error);
    }
  }

  async createProject(project: Prisma.ProjectCreateInput) {
    try {
      const createdProject = await this.db.project.create({
        data: project,
      });

      return createdProject;
    } catch (error) {
      throw handleError(error);
    }
  }

  async getProjectCategoryById(categoryId: string): Promise<ProjectCategory> {
    try {
      const category = await this.db.projectCategory.findUnique({
        where: {
          id: categoryId,
        },
      });

      if (!category) {
        throw new NotFoundError(
          `Project category with id ${categoryId} is not found`,
        );
      }

      return category;
    } catch (error) {
      throw handleError(error);
    }
  }

  async updateProject(
    projectId: string,
    project: Prisma.ProjectUpdateInput,
  ): Promise<Project> {
    try {
      const updatedProject = await this.db.project.update({
        where: {
          id: projectId,
        },
        data: project,
      });

      return updatedProject;
    } catch (error) {
      throw handleError(error);
    }
  }

  async deleteProject(projectId: string): Promise<void> {
    try {
      await this.db.project.delete({ where: { id: projectId } });
    } catch (error) {
      throw handleError(error);
    }
  }

  async getProjectById(projectId: string): Promise<Project> {
    try {
      const project = await this.db.project.findUnique({
        where: { id: projectId },
      });
      if (!project) {
        throw new NotFoundError(`Project with id ${projectId} is not found`);
      }

      return project;
    } catch (error) {
      throw handleError(error);
    }
  }

  async disconnectTechStackBySkillId(skillId: string): Promise<void> {
    try {
      const projects = await this.db.project.findMany({
        where: {
          techStack: {
            some: {
              id: skillId,
            },
          },
        },
      });

      await Promise.all(
        projects.map((project) =>
          this.db.project.update({
            where: { id: project.id },
            data: {
              techStack: {
                disconnect: {
                  id: skillId,
                },
              },
            },
          }),
        ),
      );
    } catch (error) {
      throw handleError(error);
    }
  }
}

export const projectRepo = new ProjectRepositoryPostgres(prisma, cacheRepo);
