import ProjectCards from '@/components/Projects/ProjectCards';
import Title from '@/components/Title';
import { projectService } from '@/project/ProjectService';
import { skillService } from '@/skill/SkillService';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - Taufik Hidayat',
};

export const revalidate = 0;

const ProjectsPage = async () => {
  const [{ data: projects }, { data: projectCategories }, { data: skills }] = await Promise.all([
    projectService.getAllProjects(),
    projectService.getAllCategories(),
    skillService.getAllSkills(),
  ]);

  return (
    <main>
      <Title>Projects</Title>
      <ProjectCards
        projects={projects}
        projectCategories={projectCategories}
        skills={skills}
      />
    </main>
  );
};

export default ProjectsPage;
