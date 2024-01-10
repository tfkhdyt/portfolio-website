'use client';

import { Typewriter } from 'react-simple-typewriter';

const TypewritedDesc = () => {
  return (
    <h2 className='text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-green-100 md:text-2xl'>
      <Typewriter
        words={[
          'Full Stack Developer',
          'Computer Science Student',
          'FOSS Enthusiast',
          'GNU/Linux User',
        ]}
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
