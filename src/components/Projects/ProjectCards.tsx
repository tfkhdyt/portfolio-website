'use client';

import Tabs from '../Tabs';
import ProjectCard from './Card';

import { Project, ProjectCategory, Skill } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import CreateProjectModal from './CreateProjectModal';

type Props = {
  projects: (Project & {
    techStack: Skill[];
  })[];
  projectCategories: ProjectCategory[];
  skills: Skill[];
};

const ProjectCards = ({ projects, projectCategories, skills }: Props) => {
  const [currentCategory, setCurrentCategory] = useState<ProjectCategory>(projectCategories[0]);
  const { data: session } = useSession();

  return (
    <main className='mt-2'>
      <div className='text-sm font-medium text-center text-gray-500 border-b border-gray-200 md:text-base dark:text-gray-400 dark:border-gray-700'>
        <Tabs
          items={[...projectCategories]}
          current={currentCategory}
          setter={setCurrentCategory}
        />
      </div>
      <div className='grid grid-cols-1 gap-6 mt-6 md:grid-cols-2'>
        {projects
          .filter((project) => project.categoryId === currentCategory.id)
          .map((project, idx) => (
            <ProjectCard
              project={project}
              currentCategory={currentCategory}
              projectCategories={projectCategories}
              key={project.name}
              idx={idx}
              skills={skills}
            />
          ))}
        {session && (
          <CreateProjectModal
            projectCategories={projectCategories}
            currentCategory={currentCategory}
            skills={skills}
          />
        )}
      </div>
    </main>
  );
};

export default ProjectCards;
