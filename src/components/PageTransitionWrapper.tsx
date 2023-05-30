'use client';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ReactNode } from 'react';

const PageTransitionWrapper = ({ children }: { children: ReactNode }) => {
  const [parent] = useAutoAnimate();

  return (
    <div ref={parent} className='container py-6 mx-auto md:px-32 lg:px-72'>
      {children}
    </div>
  );
};

export default PageTransitionWrapper;
