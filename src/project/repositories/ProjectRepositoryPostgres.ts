import { ProjectWithTechStack } from '@/domains/project/ProjectDto';
import ProjectRepository from '@/domains/project/ProjectRepository';
import { prisma } from '@/lib/prisma';
import { HTTPError, InternalServerError, NotFoundError } from '@/utils/error';
import { deleteCache, getCache, setCache } from '@/utils/redis';

import { Prisma, PrismaClient, Project, ProjectCategory } from '@prisma/client';

class ProjectRepositoryPostgres implements ProjectRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAllProjects(): Promise<ProjectWithTechStack[]> {
    try {
      const projectsCache = await getCache<ProjectWithTechStack[]>('projects');

      if (!projectsCache) {
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

        await setCache('projects', JSON.stringify(projects));

        return projects;
      }

      return projectsCache;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
      throw new InternalServerError('Failed to get all projects data');
    }
  }

  async getAllCategories(): Promise<ProjectCategory[]> {
    try {
      const categoriesCache = await getCache<ProjectCategory[]>('projectCategories');

      if (!categoriesCache) {
        const categories = await prisma.projectCategory.findMany({ orderBy: { id: 'asc' } });

        await setCache('projectCategories', JSON.stringify(categories));

        return categories;
      }

      return categoriesCache;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
      throw new InternalServerError('Failed to get all project categories data');
    }
  }

  async createProject(project: Prisma.ProjectCreateInput) {
    try {
      const createdProject = await this.prisma.project.create({
        data: project,
      });

      await deleteCache('projects');

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

      await deleteCache('projects');

      return updatedProject;
    } catch (error) {
      console.error(error);
      throw new InternalServerError(`Failed to update project with id ${projectId}`);
    }
  }

  async deleteProject(projectId: string): Promise<void> {
    try {
      await this.prisma.project.delete({ where: { id: projectId } });

      await deleteCache('projects');
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
}

export const projectRepo = new ProjectRepositoryPostgres(prisma);
