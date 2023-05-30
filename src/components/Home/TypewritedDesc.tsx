'use client';
import { Typewriter } from 'react-simple-typewriter';

const TypewritedDesc = () => {
  return (
    <h2 className='text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-green-200 dark:from-blue-100 dark:to-green-100'>
      <Typewriter
        words={['Junior Back-end Developer', 'Computer Science Student', 'FOSS and GNU/Linux Enthusiast']}
        loop={0}
        cursor
        cursorStyle='|'
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </h2>
  );
};

export default TypewritedDesc;
