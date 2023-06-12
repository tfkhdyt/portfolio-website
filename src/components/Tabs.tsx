import { SkillCategory } from '@prisma/client';
import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';

type PageProps<T extends SkillCategory> = {
  items: T[];
  current: T;
  setter: Dispatch<SetStateAction<T>>;
};

const Tabs = <T extends SkillCategory>({ current, items, setter }: PageProps<T>) => {
  return (
    <ul className='flex overflow-x-auto -mb-px text-center'>
      {items.map((item) => (
        <li key={item.id} className='w-full'>
          <button
            onClick={() => setter(item)}
            className={clsx(
              'inline-block p-4 w-full border-b-2',
              item.id === current.id
                ? 'text-green-200 border-green-200 dark:text-green-100 dark:border-green-100'
                : 'font-normal border-transparent text-gray-800 dark:text-gray-400 dark:hover:text-blue-100 dark:hover:border-blue-100 hover:text-blue-200 hover:border-blue-100',
            )}
          >
            {item.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
