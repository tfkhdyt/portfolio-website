'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className='py-5 px-12 border-b transition duration-300 border-gruvbox-light-text-primary/25 bg-gruvbox-light-bg-secondary dark:border-gruvbox-dark-text-primary/25 dark:bg-gruvbox-dark-bg-secondary'>
      <div className='container flex justify-between items-center mx-auto md:px-32 lg:px-72'>
        <ol className='flex gap-6 font-semibold text-gruvbox-light-text-primary dark:text-gruvbox-dark-text-primary'>
          <li>
            <Link href='/'>
              <button
                className={`${
                  pathname == '/' && 'text-gruvbox-green-200 dark:text-gruvbox-green-100'
                } transition hover:text-gruvbox-blue-100 dark:hover:text-gruvbox-blue-50`}
              >
                Home
              </button>
            </Link>
          </li>
          <li>
            <Link href='/about'>
              <button
                className={`${
                  pathname == '/about' && 'text-gruvbox-green-200 dark:text-gruvbox-green-100'
                } transition hover:text-gruvbox-blue-100 dark:hover:text-gruvbox-blue-50`}
              >
                About
              </button>
            </Link>
          </li>
          <li>
            <Link href='/skills'>
              <button
                className={`${
                  pathname == '/skills' && 'text-gruvbox-green-200 dark:text-gruvbox-green-100'
                } transition hover:text-gruvbox-blue-100 dark:hover:text-gruvbox-blue-50`}
              >
                Skills
              </button>
            </Link>
          </li>
          <li>
            <Link href='/projects'>
              <button
                className={`${
                  pathname == '/projects' && 'text-gruvbox-green-200 dark:text-gruvbox-green-100'
                } transition hover:text-gruvbox-blue-100 dark:hover:text-gruvbox-blue-50`}
              >
                Projects
              </button>
            </Link>
          </li>
          <li>
            <Link href='/contact'>
              <button
                className={`${
                  pathname == '/contact' && 'text-gruvbox-green-200 dark:text-gruvbox-green-100'
                } transition hover:text-gruvbox-blue-100 dark:hover:text-gruvbox-blue-50`}
              >
                Contact
              </button>
            </Link>
          </li>
        </ol>
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
