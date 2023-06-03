'use client';

// @ts-ignore
import { useWindowScroll } from '@uidotdev/usehooks';
import clsx from 'clsx';

const ScrollToTopButton = () => {
  const [{ y }, scrollTo] = useWindowScroll();

  return (
    <button
      aria-label='Scroll to top button'
      onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
      className={clsx(
        'fixed right-5 bottom-5 p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-200 bg-light-bg-secondary dark:bg-dark-bg-secondary dark:hover:bg-gray-700',
        y > 100
          ? 'block'
          : 'opacity-0 pointer-events-none',
      )}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-4 h-4'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18'
        />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
