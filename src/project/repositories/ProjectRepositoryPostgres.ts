import ProjectRepository from '@/domains/project/ProjectRepository';
import { HTTPError, InternalServerError, NotFoundError } from '@/utils/error';
import { Prisma, PrismaClient, Project, ProjectCategory } from '@prisma/client';

export default class ProjectRepositoryPostgres implements ProjectRepository {
  constructor(private readonly prisma: PrismaClient) {}

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
}
