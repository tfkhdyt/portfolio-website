'use client';

import { Category, skillCategories, skills } from '@/data/skills';
import Tabs from '../Tabs';
import Card from './Card';

import { useState } from 'react';

const SkillCards = () => {
  const [currentCategory, setCurrentCategory] = useState<Category>('Language');

  return (
    <main className='mt-2'>
      <div className='text-sm font-medium text-center text-gray-500 border-b border-gray-200 md:text-base dark:text-gray-400 dark:border-gray-700'>
        <Tabs
          items={[...skillCategories]}
          current={currentCategory}
          setter={setCurrentCategory}
        />
      </div>
      <div className='grid grid-cols-2 gap-6 mt-6 md:grid-cols-4'>
        {skills
          .filter((skill) => skill.category === currentCategory)
          .map((skill) => (
            <Card
              skill={skill}
              key={skill.name}
            />
          ))}
      </div>
    </main>
  );
};

export default SkillCards;
