'use client';

import { useSearchParams } from 'next/navigation';
import Tabs from '../Tabs';
import ProjectCard from './Card';
import CreateProjectModal from './CreateProjectModal';

import { ProjectCategory, Skill } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { z } from 'zod';
import { ProjectWithTechStack } from '@/domains/project/ProjectDto';

type Props = {
  projects: ProjectWithTechStack[];
  projectCategories: ProjectCategory[];
  skills: Skill[];
};

const CategorySchema = z.enum(['Web', 'API', 'CLI', 'Bot']).catch('Web');

const ProjectCards = ({ projects, projectCategories, skills }: Props) => {
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const currentCategory = CategorySchema.parse(searchParams.get('category'));

  return (
    <main className="mt-2">
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 md:text-base dark:text-gray-400 dark:border-gray-700">
        <Tabs
          items={[...projectCategories]}
          currentCategory={currentCategory}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
        {session ? (
          <CreateProjectModal
            projectCategories={projectCategories}
            currentCategory={currentCategory}
            skills={skills}
            key="add-project-btn"
          />
        ) : null}
        {projects
          .filter((project) => project.category?.name === currentCategory)
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
      </div>
    </main>
  );
};

export default ProjectCards;
