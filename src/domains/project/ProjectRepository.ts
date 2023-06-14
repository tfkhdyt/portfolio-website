import { Prisma, Project, ProjectCategory } from '@prisma/client';

export default interface ProjectRepository {
  getAllProjects(): Promise<Project[]>;
  getAllCategories(): Promise<ProjectCategory[]>;
  createProject(project: Prisma.ProjectCreateInput): Promise<Project>;
  getProjectCategoryById(categoryId: string): Promise<ProjectCategory>;
  getProjectById(projectId: string): Promise<Project>;
  updateProject(projectId: string, project: Prisma.ProjectUpdateInput): Promise<Project>;
  deleteProject(projectId: string): Promise<void>;
}
