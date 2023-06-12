import { Skill, SkillCategory } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import DeleteSkillModal from './DeleteSkillModal';
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
          priority={skill.categoryId === skillCategories[0].id}
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
          <DeleteSkillModal oldData={skill} />
        </div>
      )}
    </div>
  );
};

export default Card;
