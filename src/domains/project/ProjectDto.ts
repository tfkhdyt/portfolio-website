export type CreateProjectRequest = {
  name: string;
  desc: string;
  photo: File;
  repoUrl?: string;
  demoUrl?: string;
  categoryId: string;
  techStack: string[];
};

export type UpdateProjectRequest = {
  name?: string;
  desc?: string;
  photo?: File;
  repoUrl?: string;
  demoUrl?: string;
  categoryId?: string;
  techStack?: string[];
};
