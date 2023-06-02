import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';

type PageProps<T extends string> = {
  items: T[];
  current: T;
  setter: Dispatch<SetStateAction<T>>;
};

const Tabs = <T extends string>({ current, items, setter }: PageProps<T>) => {
  return (
    <ul className='flex overflow-x-auto -mb-px text-center'>
      {items.map((item, idx) => (
        <li key={idx} className='w-full'>
          <button
            onClick={() => setter(item)}
            className={clsx(
              'inline-block  p-4 w-full rounded-t-lg border-b-2',
              item === current
                ? 'text-green-100 border-green-100'
                : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300',
            )}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
