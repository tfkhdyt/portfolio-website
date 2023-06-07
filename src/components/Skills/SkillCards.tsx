'use client';

import { Category, skillCategories, skills } from '@/data/skills';
import Tabs from '../Tabs';

import Image from 'next/image';
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
          .filter((skill) => skill.category === currentCategory).map((skill) => (
            <div
              className='block flex flex-col items-center p-4 space-y-2 bg-white rounded-lg border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 group dark:hover:bg-gray-700'
              key={skill.name}
            >
              <div className='relative w-3/6 aspect-square'>
                <Image
                  src={`/img/tech/${skill.photoUrl}`}
                  alt={skill.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  className='grayscale group-hover:grayscale-0'
                  sizes='(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw'
                  priority={skill.category === 'Language'}
                />
              </div>
              <h1 className='font-medium tracking-tight text-center text-gray-900 md:text-lg dark:text-white'>
                {skill.name}
              </h1>
            </div>
          ))}
      </div>
    </main>
  );
};

export default SkillCards;
