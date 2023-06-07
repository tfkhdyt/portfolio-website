'use client';

import { Category, projectCategories, projects } from '@/data/projects';
import Tabs from '../Tabs';
import ProjectCard from './Card';

import { useState } from 'react';

const ProjectCards = () => {
  const [currentCategory, setCurrentCategory] = useState<Category>('Web');

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
          .filter((project) => project.category === currentCategory)
          .map((project, idx) => <ProjectCard project={project} idx={idx} key={project.name} />)}
      </div>
    </main>
  );
};

export default ProjectCards;
