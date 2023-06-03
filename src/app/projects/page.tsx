import ProjectCards from '@/components/Projects/ProjectCards';
import Title from '@/components/Title';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - Taufik Hidayat',
};

const ProjectsPage = () => {
  return (
    <main>
      <Title>Projects</Title>
      <ProjectCards />
    </main>
  );
};

export default ProjectsPage;
