'use client';

import ThemeSwitcher from './ThemeSwitcher';

import clsx from 'clsx';
import { Spin as Hamburger } from 'hamburger-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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
  const [isOpen, setOpen] = useState(false);

  return (
    <div className='fixed top-0 left-0 z-50 w-full'>
      <nav className='border-b md:w-auto border-light-fg-secondary/25 bg-light-bg-secondary dark:border-dark-fg-secondary/25 dark:bg-dark-bg-secondary'>
        <div className='flex justify-between items-center py-2 px-8 mx-auto md:py-4 md:px-16 lg:container lg:px-32 xl:px-72'>
          <ol className='hidden gap-6 font-semibold md:flex text-light-fg-primary dark:text-dark-fg-primary'>
            {contents.map((content, idx) => (
              <li key={idx}>
                <Link href={content.target}>
                  <button
                    className={clsx(
                      'hover:text-blue-200 dark:hover:text-blue-100',
                      pathname == content.target && 'text-green-200 dark:text-green-100',
                    )}
                  >
                    {content.title}
                  </button>
                </Link>
              </li>
            ))}
          </ol>
          <div className='-ml-2.5 md:hidden'>
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              direction='right'
              size={28}
              rounded
              label='Hamburger button'
            />
          </div>
          <ThemeSwitcher />
        </div>
      </nav>
      {/* mobile nav */}
      <div
        className={clsx(
          'absolute w-screen md:hidden h-[92.5vh] bg-light-bg-primary dark:bg-dark-bg-primary -translate-x-full px-8 py-4',
          isOpen && 'translate-x-0',
        )}
      >
        <ol className='space-y-4 font-medium text-light-fg-primary dark:text-dark-fg-primary'>
          {contents.map((content, idx) => (
            <li key={idx}>
              <Link href={content.target} onClick={() => setOpen(false)}>
                <button
                  className={clsx(
                    'hover:text-blue-100 hover:border-blue-100 dark:hover:text-blue-100 dark:hover:border-blue-100 py-4 w-full text-left',
                    pathname == content.target
                      ? 'text-green-200 border-green-200 dark:text-green-100 dark:border-green-100 border-b-2'
                      : 'border-light-fg-secondary/50 dark:border-dark-fg-secondary/50 border-b',
                  )}
                >
                  {content.title}
                </button>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Navbar;
