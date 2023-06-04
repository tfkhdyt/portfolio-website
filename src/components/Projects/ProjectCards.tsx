'use client';

import { skills } from '../Skills/SkillCards';
import Tabs from '../Tabs';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const projectCategories = ['Web', 'API', 'CLI', 'Bot', 'Other'] as const;

type Category = typeof projectCategories[number];

const techStack = [...skills.map((skill) => skill.name)] as const;

type TechStack = typeof techStack[number];

type Project = {
  name: string;
  desc: string;
  photoUrl: string;
  category: Category;
  techStack: TechStack[];
  url?: {
    repo?: string;
    demo?: string;
  };
};

const projects: Project[] = [
  {
    name: 'Netflix Clone',
    desc: 'Netflix Landing Page slicing challenge for https://codedesign.dev',
    category: 'Web',
    techStack: ['HTML', 'Alpine.js', 'UnoCSS'],
    url: {
      repo: 'https://github.com/tfkhdyt/netflix-clone',
      demo: 'https://netflix-tfkhdyt.vercel.app/',
    },
    photoUrl: 'netflix-clone.png',
  },
  {
    name: 'Pondokeun',
    desc: 'Lightweight, Modern, Free and Open Source URL Shortener',
    category: 'Web',
    techStack: [
      'TypeScript',
      'SvelteKit',
      'Node.js',
      'Prisma',
      'tRPC',
      'Tailwind CSS',
      'PostgreSQL',
    ],
    url: {
      repo: 'https://github.com/tfkhdyt/pondokeun',
      demo: 'https://link.tfkhdyt.my.id/',
    },
    photoUrl: 'pondokeun.png',
  },
  {
    name: 'WhatsApp Link Generator',
    desc: 'Web app to generate WhatsApp contact link with default message easily',
    category: 'Web',
    techStack: [
      'TypeScript',
      'SvelteKit',
      'Tailwind CSS',
    ],
    url: {
      repo: 'https://github.com/tfkhdyt/whatsapp-link-generator',
      demo: 'https://walinkgen.tfkhdyt.my.id/',
    },
    photoUrl: 'whatsapp-link-generator.png',
  },
  {
    name: 'M/M/s Queue Theory Calculator',
    desc: 'Calculator to solve M/M/s queue theory problem, written in TypeScript and SvelteKit.',
    category: 'Web',
    techStack: [
      'TypeScript',
      'SvelteKit',
      'Tailwind CSS',
    ],
    url: {
      repo: 'https://github.com/tfkhdyt/mms-queue-theory-calculator',
      demo: 'https://queue.tfkhdyt.my.id/',
    },
    photoUrl: 'mms-calculator.png',
  },
  {
    name: 'Portfolio Website v3',
    desc: 'Third revision of my portfolio website',
    category: 'Web',
    techStack: [
      'TypeScript',
      'Next.js',
      'Node.js',
      'Mantine',
    ],
    url: {
      repo: 'https://github.com/tfkhdyt/web-portfolio-v3',
      demo: 'https://www.tfkhdyt.my.id/',
    },
    photoUrl: 'portfolio-website-v3.png',
  },
  {
    name: 'To Do List',
    desc: 'Simple Todo List App with Authentication',
    category: 'Web',
    techStack: [
      'TypeScript',
      'Next.js',
      'Node.js',
      'Prisma',
      'Mantine',
    ],
    url: {
      repo: 'https://github.com/tfkhdyt/todo-prisma',
      demo: 'http://tfkhdyt-todo-list.vercel.app/',
    },
    photoUrl: 'todolist.png',
  },
  {
    name: 'Full Stack Roadmap',
    desc: 'Roadmap about how to become a Full Stack Developer',
    category: 'Web',
    techStack: [
      'TypeScript',
      'Next.js',
      'NestJS',
      'Node.js',
      'MongoDB',
    ],
    url: {
      repo: 'https://github.com/tfkhdyt/full-stack-roadmap',
      demo: 'https://roadmap.tfkhdyt.my.id/',
    },
    photoUrl: 'full-stack-roadmap.png',
  },
  {
    name: 'Portfolio Website v2',
    desc: 'Second revision of my portfolio website',
    category: 'Web',
    techStack: [
      'TypeScript',
      'Next.js',
      'Tailwind CSS',
    ],
    url: {
      repo: 'https://github.com/tfkhdyt/web-portfolio',
      demo: 'https://v2.tfkhdyt.my.id',
    },
    photoUrl: 'portfolio-website-v2.png',
  },
  {
    name: 'Bookstore',
    desc: 'Books management app',
    category: 'Web',
    techStack: [
      'TypeScript',
      'Next.js',
      'Golang',
      'Gin Gonic',
      'Mantine',
      'PostgreSQL',
    ],
    url: {
      repo: 'https://github.com/tfkhdyt/bookstore',
      demo: 'https://bookstore.tfkhdyt.my.id/',
    },
    photoUrl: 'bookstore.jpg',
  },
  {
    name: 'LAM Final Project',
    desc: 'Web app to solve some linear algebra and matrices problems',
    category: 'Web',
    techStack: [
      'JavaScript',
      'Next.js',
      'Tailwind CSS',
    ],
    url: {
      repo: 'https://github.com/tfkhdyt/tugas-akhir-aljabar-linier-matriks',
      demo: 'https://aljabar-linier-matriks-kelompok-2.vercel.app/',
    },
    photoUrl: 'lam-final-project.png',
  },
  {
    name: 'Random Quote Generator',
    desc: 'Web app that will generate a random quote for you',
    category: 'Web',
    techStack: [
      'TypeScript',
      'Next.js',
      'Tailwind CSS',
    ],
    url: {
      repo: 'https://github.com/tfkhdyt/random-quote-generator',
      demo: 'https://quotes.tfkhdyt.my.id/',
    },
    photoUrl: 'random-quote-generator.png',
  },
  {
    name: 'Portfolio Website v1',
    desc: 'My first portfolio website',
    category: 'Web',
    techStack: [
      'JavaScript',
      'Bootstrap',
    ],
    url: {
      repo: 'https://github.com/tfkhdyt/tfkhdyt-portfolio',
      demo: 'https://tfkhdyt.web.app/',
    },
    photoUrl: 'portfolio-website-v1.png',
  },
  {
    name: 'MovieDB',
    desc: 'Web app to search movie information',
    category: 'Web',
    techStack: [
      'JavaScript',
      'Bootstrap',
    ],
    url: {
      repo: 'https://github.com/tfkhdyt/imdb',
      demo: 'https://movie.tfkhdyt.my.id/',
    },
    photoUrl: 'movie-db.png',
  },
];

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
              key={idx}
            >
              <div className='relative w-full aspect-video'>
                <Image
                  src={`/img/projects/${project.photoUrl}`}
                  alt={project.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className='rounded-t-lg grayscale group-hover:grayscale-0'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
                  loading={project.category === 'Web' ? 'eager' : 'lazy'}
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
                    .map((skill, idx) => (
                      <div className='relative w-6 h-6' key={idx}>
                        <Image
                          src={`/img/tech/${skill.photoUrl}`}
                          alt={skill.name}
                          fill
                          style={{ objectFit: 'contain' }}
                          className='grayscale group-hover:grayscale-0'
                          sizes='(max-width: 768px) 8vw, (max-width: 1200px) 16vw, 32vw'
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
