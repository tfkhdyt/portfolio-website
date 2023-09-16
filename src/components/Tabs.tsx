import { SkillCategory } from '@prisma/client';
import clsx from 'clsx';
import Link from 'next/link';

type PageProps<T extends SkillCategory> = {
  items: T[];
  currentCategory: string;
};

const Tabs = <T extends SkillCategory>({
  currentCategory,
  items,
}: PageProps<T>) => {
  return (
    <ul className="flex overflow-x-auto -mb-px text-center">
      {items.map((item) => (
        <li key={item.id} className="w-full">
          <Link
            href={`?${new URLSearchParams({
              category: item.name,
            })}`}
            className={clsx(
              'inline-block p-4 w-full border-b-2 transition duration-300',
              item.name === currentCategory
                ? 'text-green-200 border-green-200 dark:text-green-100 dark:border-green-100'
                : 'font-normal border-transparent text-gray-800 dark:text-gray-400 dark:hover:text-blue-100 dark:hover:border-blue-100 hover:text-blue-200 hover:border-blue-100',
            )}
            data-umami-event={`Tab | ${item.name}`}
            scroll={false}
            replace
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
