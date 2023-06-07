import { Skill } from '@/data/skills';

import Image from 'next/image';

type Props = {
  skill: Skill;
};

const Card = ({ skill }: Props) => {
  return (
    <div className='block flex flex-col items-center p-4 space-y-2 bg-white rounded-lg border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 group dark:hover:bg-gray-700'>
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
  );
};

export default Card;
