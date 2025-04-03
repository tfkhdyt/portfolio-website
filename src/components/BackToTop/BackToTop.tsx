import { useSelector } from 'react-redux';

import useScroll from '@/hooks/useScroll';
import { handleDrawer } from '@/lib/scroll-to-section/scroll-to-section';
import { RootState } from '@/redux/store';

import { Rocket } from './Rocket';

export function BackToTop() {
  const scrollY = useScroll();
  const isMenuOpened = useSelector(
    (state: RootState) => state.menu.isMenuOpened
  );

  return (
    <div className='fixed bottom-8 right-8 lg:right-12'>
      <button
        className={`inline-block p-3 bg-base-100 text-blue-500 border border-blue-500 rounded-full hover:text-white hover:bg-blue-500 active:bg-blue-400 focus:outline-none focus:ring transition-all duration-500 ease-in-out 
        ${
          scrollY >= 100 && !isMenuOpened
            ? 'opacity-1'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => handleDrawer('#hero')}
      >
        <span className='sr-only'> Back to top </span>
        <Rocket />
      </button>
    </div>
  );
}
