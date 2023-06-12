import { CreateProjectRequest, UpdateProjectRequest } from '@/domains/project/ProjectDto';
import ProjectRepository from '@/domains/project/ProjectRepository';
import { imagekit } from '@/lib/imagekit';
import { prisma } from '@/lib/prisma';
import { InternalServerError } from '@/utils/error';
import ProjectRepositoryPostgres from './repositories/ProjectRepositoryPostgres';

import ImageKit from 'imagekit';

class ProjectService {
  constructor(
    private readonly projectRepo: ProjectRepository,
    private readonly imageKit: ImageKit,
  ) {}

  private async verifyCategoryId(categoryId: string) {
    this.projectRepo.getProjectCategoryById(categoryId);
  }

  private async uploadImage(image: File) {
    try {
      const { url, fileId } = await this.imageKit.upload({
        file: Buffer.from(await image.arrayBuffer()),
        fileName: image.name,
        folder: '/projects',
      });

      return { photoUrl: url, photoId: fileId };
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }

      throw new InternalServerError('Failed to upload image');
    }
  }

  async createProject(payload: CreateProjectRequest) {
    await this.verifyCategoryId(payload.categoryId);

    const { photoUrl, photoId } = await this.uploadImage(payload.photo);

    const techStackId = payload.techStack.map((tech) => ({ id: tech }));

    const createdProject = await this.projectRepo.createProject({
      name: payload.name,
      desc: payload.desc,
      photoId,
      photoUrl,
      repoUrl: payload.repoUrl,
      demoUrl: payload.demoUrl,
      category: {
        connect: {
          id: payload.categoryId,
        },
      },
      techStack: {
        connect: techStackId,
      },
    });

    return {
      message: 'New project has been added',
      data: createdProject,
    };
  }

  private async verifyProjectAvailability(projectId: string) {
    return this.projectRepo.getProjectById(projectId);
  }

  private async deleteImage(photoId: string) {
    try {
      await this.imageKit.deleteFile(photoId);
    } catch (error) {
      console.error(error);
      throw new InternalServerError(`Failed to delete image with id ${photoId}`);
    }
  }

  async updateProject(projectId: string, payload: UpdateProjectRequest) {
    const oldProject = await this.verifyProjectAvailability(projectId);

    if (payload.categoryId) {
      await this.verifyCategoryId(payload.categoryId);
    }

    let photoUrl: string | undefined;
    let photoId: string | undefined;
    if (payload.photo) {
      const result = await this.uploadImage(payload.photo);
      photoUrl = result.photoUrl;
      photoId = result.photoId;
    }

    const updatedProject = await this.projectRepo.updateProject(projectId, {
      name: payload.name,
      desc: payload.desc,
      photoUrl,
      photoId,
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

    if (photoId) {
      await this.deleteImage(oldProject.photoId);
    }

    return {
      message: `${updatedProject.name} has been updated`,
    };
  }
}

const projectRepo = new ProjectRepositoryPostgres(prisma);

export const projectService = new ProjectService(projectRepo, imagekit);
