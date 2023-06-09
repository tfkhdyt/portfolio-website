import { Skill, SkillCategory } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import UpdateSkillModal from './UpdateSkillModal';

type Props = {
  skill: Skill;
  currentCategory: SkillCategory;
  skillCategories: SkillCategory[];
};

const Card = ({ skill, currentCategory, skillCategories }: Props) => {
  const { data: session } = useSession();

  return (
    <div className='flex relative flex-col items-center p-4 space-y-2 bg-white rounded-lg border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 group dark:hover:bg-gray-700'>
      <div className='relative w-3/6 aspect-square'>
        <Image
          src={skill.photoUrl}
          alt={skill.name}
          fill
          style={{ objectFit: 'contain' }}
          className='grayscale group-hover:grayscale-0'
          sizes='(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw'
          priority={skill.categoryId === 'Language'}
        />
      </div>
      <h1 className='font-medium tracking-tight text-center text-gray-900 md:text-lg dark:text-white'>
        {skill.name}
      </h1>
      {session && (
        <div className='flex absolute inset-x-0 bottom-0 font-medium text-white opacity-0 group-hover:opacity-100 justify-stretch'>
          <UpdateSkillModal
            currentCategory={currentCategory}
            oldData={skill}
            skillCategories={skillCategories}
          />
          <button className='p-3 w-full bg-gradient-to-b from-transparent to-red-100 rounded-br-lg hover:to-red-200'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='mx-auto w-6 h-6'
            >
              <path
                fillRule='evenodd'
                d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
