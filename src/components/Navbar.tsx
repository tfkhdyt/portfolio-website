'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
  const pathname = usePathname();
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

  return (
    <nav className='py-5 px-12 border-b border-light-fg-secondary/25 bg-light-bg-secondary dark:border-dark-fg-secondary/25 dark:bg-dark-bg-secondary'>
      <div className='container flex justify-between items-center mx-auto md:px-32 lg:px-72'>
        <ol className='flex gap-6 font-semibold text-light-fg-primary dark:text-dark-fg-primary'>
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
