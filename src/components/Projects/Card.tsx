import { ProjectWithTechStack } from '@/domains/project/ProjectDto';
import { thumbnailDataUrl } from '../../../public/img/thumbnail';
import DeleteProjectModal from './DeleteProjectModal';
import UpdateProjectModal from './UpdateProjectModal';

import { ProjectCategory, Skill } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

type Props = {
  project: ProjectWithTechStack;
  currentCategory: ProjectCategory;
  projectCategories: ProjectCategory[];
  skills: Skill[];
  idx: number;
};

const ProjectCard = ({
  project,
  currentCategory,
  projectCategories,
  skills,
}: Props) => {
  const { data: session } = useSession();

  return (
    <div
      className='flex relative flex-col bg-white rounded-lg border border-gray-200 shadow transition duration-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 group dark:hover:bg-gray-700'
      key={project.name}
    >
      <Zoom
        classDialog='custom-zoom'
        zoomImg={{
          src: project.photoUrl,
          sizes: '(min-width: 0px) 100vw',
        }}
      >
        <div className='relative w-full aspect-w-16 aspect-h-9'>
          <Image
            src={project.photoUrl}
            alt={project.name}
            fill
            style={{ objectFit: 'cover' }}
            className='rounded-t-lg transition duration-300 grayscale group-hover:grayscale-0'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
            blurDataURL={project.lqip ?? thumbnailDataUrl}
            placeholder='blur'
            // priority={project.categoryId === projectCategories[0].id && idx < 4}
          />
        </div>
      </Zoom>
      <div className='flex flex-col justify-between p-4 space-y-2 h-full'>
        <div className='space-y-1'>
          <div className='flex justify-between items-start'>
            <p className='text-xl font-semibold'>{project.name}</p>
            <div className='flex space-x-1'>
              {project.repoUrl ? (
                <Link
                  href={project.repoUrl}
                  target='_blank'
                  aria-label={`${project.name}'s repository`}
                  data-umami-event={`Project repository link | ${project.name}`}
                >
                  <button
                    className='p-1 rounded transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-800'
                    aria-label={`${project.name}'s repository`}
                    title='Repository'
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
              ) : null}
              {project.demoUrl ? (
                <Link
                  href={project.demoUrl}
                  target='_blank'
                  aria-label={`${project.name}'s demo`}
                  data-umami-event={`Project demo link | ${project.name}`}
                >
                  <button
                    className='p-1 rounded transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-800'
                    aria-label={`${project.name}'s demo`}
                    title='Demo'
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
              ) : null}
            </div>
          </div>
          <p className='dark:text-gray-200 text-light-fg-secondary'>
            {project.desc}
          </p>
        </div>
        <div className='flex py-2 space-x-2'>
          {project.techStack.map((skill) => (
            <div
              className='relative w-6 h-6'
              key={skill.name}
              title={skill.name}
            >
              <Image
                src={skill.photoUrl}
                alt={skill.name}
                fill
                style={{ objectFit: 'contain' }}
                className='transition duration-300 grayscale group-hover:grayscale-0'
                sizes='(max-width: 768px) 8vw, (max-width: 1200px) 16vw, 32vw'
                priority={project.categoryId === projectCategories[0].id}
                placeholder={skill.lqip ? 'blur' : undefined}
                blurDataURL={skill.lqip ?? undefined}
              />
            </div>
          ))}
        </div>
      </div>
      {session ? (
        <div className='flex absolute inset-x-0 bottom-0 font-medium text-white opacity-0 transition duration-300 group-hover:opacity-100 justify-stretch'>
          <UpdateProjectModal
            currentCategory={currentCategory}
            oldData={project}
            projectCategories={projectCategories}
            skills={skills}
          />
          <DeleteProjectModal oldData={project} />
        </div>
      ) : null}
    </div>
  );
};

export default ProjectCard;
