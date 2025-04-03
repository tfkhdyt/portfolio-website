import { useEffect, useState } from 'react';

import { handleDrawer } from '@/lib/scroll-to-section/scroll-to-section';

import { menu } from '../Layout/data';
import Icon from './Icon';

const getIsThemeDark = () => {
  if (typeof window !== 'undefined') {
    const theme = window.localStorage.getItem('theme');
    if (theme == 'light') return false;
    if (theme == 'dracula') return true;
  }
};

const Navbar = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    document
      .querySelector('.drawer-content')!
      .addEventListener('scroll', () => {
        const element: Element = document.querySelector('.drawer-content')!;
        // console.log(element.scrollTop)
        setScrollY(element.scrollTop);
      });
  }, []);

  return (
    <div
      className={`w-screen navbar sticky inset-x-0 top-0 z-50 ${
        scrollY >= 140
          ? 'bg-base-100/50 backdrop-blur border-b'
          : 'bg-ghost border-b-0'
      } transition-all duration-200 ease-in-out lg:px-40 border-base-content/25`}
    >
      <div className='flex-none md:hidden'>
        <label htmlFor='my-drawer-3' className='btn btn-ghost btn-square'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block h-6 w-6 stroke-current'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'
            ></path>
          </svg>
        </label>
      </div>
      <div
        className={`flex-1 items-center space-x-1 text-xl font-extrabold transition-all duration-500 md:ml-2 ${
          scrollY <= 140 && 'opacity-0'
        }`}
      >
        <Icon />
        <span>TFKHDYT</span>
      </div>
      <div className='hidden flex-none md:block'>
        <ul className='menu menu-horizontal'>
          {/* Navbar menu content here */}
          {menu.map((value) => {
            return (
              <li key={value.title}>
                <label
                  className={`rounded-lg font-semibold hover:bg-blue-500 umami--click--${value.title}-section`}
                  onClick={() => handleDrawer(value.to)}
                >
                  {value.title}
                </label>
              </li>
              // <li key={value.title}>
              //   <a href={value.to} className='font-semibold'>
              //     {value.title}
              //   </a>
              // </li>
            );
          })}
        </ul>
      </div>
      <div className='mr-2 flex-none'>
        <div className='form-control'>
          <label className='label cursor-pointer space-x-1'>
            <span className='label-text'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
            <input
              data-toggle-theme='dracula,light'
              data-act-class='ACTIVECLASS'
              className='umami--change--switch-theme toggle'
              type='checkbox'
              defaultChecked={getIsThemeDark()}
            />
            {/* <input type='checkbox' className='toggle' /> */}
            <span className='label-text'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
              </svg>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
