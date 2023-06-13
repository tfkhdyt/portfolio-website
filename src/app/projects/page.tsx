import ProjectCards from '@/components/Projects/ProjectCards';
import Title from '@/components/Title';
import { prisma } from '@/lib/prisma';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - Taufik Hidayat',
};

// export const revalidate = 0;

const ProjectsPage = async () => {
  const [projects, projectCategories, skills] = await Promise.all([
    prisma.project.findMany({
      orderBy: { id: 'desc' },
      include: {
        techStack: {
          orderBy: [
            { categoryId: 'asc' },
            { id: 'asc' },
          ],
        },
      },
    }),
    prisma.projectCategory.findMany({ orderBy: { id: 'asc' } }),
    prisma.skill.findMany({
      orderBy: [
        { categoryId: 'asc' },
        { id: 'asc' },
      ],
    }),
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
