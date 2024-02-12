import { Prisma, Project, ProjectCategory } from '@prisma/client';
import { ProjectWithTechStack } from './ProjectDto';

export default interface ProjectRepository {
	getAllProjectsFromDB(): Promise<ProjectWithTechStack[]>;
	getAllProjectsFromCache(): Promise<ProjectWithTechStack[] | null>;
	getAllCategoriesFromDB(): Promise<ProjectCategory[]>;
	getAllCategoriesFromCache(): Promise<ProjectCategory[] | null>;
	createProject(project: Prisma.ProjectCreateInput): Promise<Project>;
	getProjectCategoryById(categoryId: string): Promise<ProjectCategory>;
	getProjectById(projectId: string): Promise<Project>;
	updateProject(
		projectId: string,
		project: Prisma.ProjectUpdateInput,
	): Promise<Project>;
	deleteProject(projectId: string): Promise<void>;
	disconnectTechStackBySkillId(skillId: string): Promise<void>;
}
