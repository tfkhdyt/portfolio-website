import { CreateProjectRequest, UpdateProjectRequest } from '@/domains/project/ProjectDto';
import ProjectRepository from '@/domains/project/ProjectRepository';
import { deleteImage, uploadImage } from '@/utils/imagekit';
import { getLQIP } from '@/utils/plaiceholder';
import { projectRepo } from './repositories/ProjectRepositoryPostgres';

class ProjectService {
  constructor(
    private readonly projectRepo: ProjectRepository,
  ) {}

  private async verifyCategoryId(categoryId: string) {
    this.projectRepo.getProjectCategoryById(categoryId);
  }

  async getAllProjects() {
    const projects = await projectRepo.getAllProjects();

    return {
      message: 'success',
      data: projects,
    };
  }

  async getAllCategories() {
    const categories = await projectRepo.getAllCategories();

    return {
      message: 'success',
      data: categories,
    };
  }

  async createProject(payload: CreateProjectRequest) {
    await this.verifyCategoryId(payload.categoryId);

    const { photoUrl, photoId } = await uploadImage(payload.photo, '/projects');
    const lqip = await getLQIP(payload.photo);

    const techStackId = payload.techStack.map((tech) => ({ id: tech }));

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
        connect: techStackId,
      },
    });

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
      const result = await uploadImage(payload.photo, '/projects');
      photoUrl = result.photoUrl;
      photoId = result.photoId;

      lqip = await getLQIP(payload.photo);
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

    if (photoId) {
      await deleteImage(oldProject.photoId);
    }

    return {
      message: `${updatedProject.name} has been updated`,
      data: updatedProject,
    };
  }

  async deleteProject(projectId: string) {
    const project = await this.verifyProjectAvailability(projectId);
    await this.projectRepo.deleteProject(projectId);
    await deleteImage(project.photoId);

    return {
      message: `${project.name} has been deleted`,
    };
  }
}

export const projectService = new ProjectService(projectRepo);
