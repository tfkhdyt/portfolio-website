'use client';

import { Category, projectCategories, projects } from '@/data/projects';
import Tabs from '../Tabs';

import { skills } from '@/data/skills';
import Image from 'next/image';
import Link from 'next/link';
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
          .map((project, idx) => (
            <div
              className='block flex flex-col bg-white rounded-lg border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 group dark:hover:bg-gray-700'
              key={project.name}
            >
              <div className='relative w-full aspect-video'>
                <Image
                  src={`/img/projects/${project.photoUrl}`}
                  alt={project.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className='rounded-t-lg grayscale group-hover:grayscale-0'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
                  priority={project.category === 'Web' && idx < 4}
                />
              </div>
              <div className='flex flex-col justify-between p-4 space-y-2 h-full'>
                <div className='space-y-1'>
                  <div className='flex justify-between items-start'>
                    <p className='text-xl font-semibold'>{project.name}</p>
                    <div className='flex space-x-1'>
                      {project.url?.repo && (
                        <Link
                          href={project.url.repo}
                          target='_blank'
                          aria-label={`${project.name}'s repository`}
                        >
                          <button
                            className='p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-800'
                            aria-label={`${project.name}'s repository`}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='w-6 h-6'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z'
                              />
                            </svg>
                          </button>
                        </Link>
                      )}
                      {project.url?.demo && (
                        <Link
                          href={project.url.demo}
                          target='_blank'
                          aria-label={`${project.name}'s demo`}
                        >
                          <button
                            className='p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-800'
                            aria-label={`${project.name}'s demo`}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='w-6 h-6'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
                              />
                            </svg>
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                  <p className='dark:text-gray-200 text-light-fg-secondary'>
                    {project.desc}
                  </p>
                </div>
                <div className='flex py-2 space-x-2'>
                  {skills
                    .filter((skill) => project.techStack.includes(skill.name))
                    .map((skill) => (
                      <div className='relative w-6 h-6' key={skill.name}>
                        <Image
                          src={`/img/tech/${skill.photoUrl}`}
                          alt={skill.name}
                          fill
                          style={{ objectFit: 'contain' }}
                          className='grayscale group-hover:grayscale-0'
                          sizes='(max-width: 768px) 8vw, (max-width: 1200px) 16vw, 32vw'
                          priority={project.category === 'Web'}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default ProjectCards;
