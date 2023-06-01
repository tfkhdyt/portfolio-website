'use client';

import ThemeSwitcher from './ThemeSwitcher';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const contents = [
  {
    target: '/',
    title: 'Home',
  },
  {
    target: '/about',
    title: 'About',
  },
  {
    target: '/skills',
    title: 'Skills',
  },
  {
    target: '/projects',
    title: 'Projects',
  },
  {
    target: '/contact',
    title: 'Contact',
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className='border-b border-light-fg-secondary/25 bg-light-bg-secondary dark:border-dark-fg-secondary/25 dark:bg-dark-bg-secondary'>
      <div className='flex justify-between items-center py-5 px-8 mx-auto md:px-16 lg:container lg:px-32 xl:px-72'>
        <ol className='hidden gap-6 font-semibold md:flex text-light-fg-primary dark:text-dark-fg-primary'>
          {contents.map((content, idx) => (
            <li key={idx}>
              <Link href={content.target}>
                <button
                  className={clsx(
                    'transition hover:text-blue-100 dark:hover:text-blue-50',
                    pathname == content.target && 'text-green-200 dark:text-green-100',
                  )}
                >
                  {content.title}
                </button>
              </Link>
            </li>
          ))}
        </ol>
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
