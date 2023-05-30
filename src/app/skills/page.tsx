'use client';
import Title from '@/components/Title';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

const skillCategories = ['Languages', 'Framework', 'Library', 'DBMS', 'Misc'];
type Skill = {
  name: string;
  category: (typeof skillCategories)[number];
  photoUrl: string;
};

const SkillsPage = () => {
  const skills: Skill[] = [
    {
      name: 'HTML',
      category: 'Languages',
      photoUrl: 'html.svg',
    },
    {
      name: 'CSS',
      category: 'Languages',
      photoUrl: 'css.svg',
    },
    {
      name: 'JavaScript',
      category: 'Languages',
      photoUrl: 'js.svg',
    },
    {
      name: 'TypeScript',
      category: 'Languages',
      photoUrl: 'ts.svg',
    },
    {
      name: 'Node.js',
      category: 'Languages',
      photoUrl: 'node.png',
    },
    {
      name: 'Golang',
      category: 'Languages',
      photoUrl: 'golang.svg',
    },
    {
      name: 'Next.js',
      category: 'Framework',
      photoUrl: 'next.svg',
    },
    {
      name: 'SvelteKit',
      category: 'Framework',
      photoUrl: 'sveltekit.svg',
    },
    {
      name: 'Express',
      category: 'Framework',
      photoUrl: 'express.svg',
    },
    {
      name: 'NestJS',
      category: 'Framework',
      photoUrl: 'nest.svg',
    },
    {
      name: 'Hapi.js',
      category: 'Framework',
      photoUrl: 'hapi.png',
    },
    {
      name: 'Fastify',
      category: 'Framework',
      photoUrl: 'fastify.svg',
    },
    {
      name: 'Gin Gonic',
      category: 'Framework',
      photoUrl: 'gin.png',
    },
    {
      name: 'Fiber',
      category: 'Framework',
      photoUrl: 'fiber.svg',
    },
    {
      name: 'Telegraf',
      category: 'Framework',
      photoUrl: 'telegraf.svg',
    },
    {
      name: 'whatsapp-web.js',
      category: 'Framework',
      photoUrl: 'wwebjs.png',
    },
  ];
  const [currentCategory, setCurrentCategory] = useState<(typeof skillCategories)[number]>('Languages');

  return (
    <div>
      <Title>Skills</Title>
      <div>
        <div className='text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700'>
          <ul className='flex flex-wrap -mb-px'>
            {skillCategories.map((category, idx) => (
              <li className='mr-2' key={idx}>
                <button
                  onClick={() => setCurrentCategory(category)}
                  className={clsx(
                    'inline-block p-4 rounded-t-lg border-b-2',
                    category === currentCategory
                      ? 'text-green-200 border-green-200 dark:text-green-100 dark:border-green-100'
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300',
                  )}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className='grid grid-cols-4 gap-6 mt-6'>
          {skills.filter((skill) => skill.category === currentCategory).map((skill, idx) => (
            <div
              className='block flex flex-col items-center p-4 space-y-2 bg-white rounded-lg border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
              key={idx}
            >
              <div className='relative w-3/6 aspect-square'>
                <Image src={`/img/tech/${skill.photoUrl}`} alt={skill.name} fill style={{ objectFit: 'contain' }} />
              </div>
              <h5 className='text-lg font-bold tracking-tight text-center text-gray-900 dark:text-white'>
                {skill.name}
              </h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
