'use client';

import Image from 'next/image';
import { Typewriter } from 'react-simple-typewriter';

export default function Home() {
  return (
    <div className='flex justify-around items-center min-h-[75vh]'>
      <div className='space-y-2'>
        <h1 className='text-5xl font-bold'>Taufik Hidayat</h1>
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
        <p className='text-lg'>
          Hi everyone <span className='wave'>👋🏼</span>, welcome to my portfolio website.
        </p>
      </div>
      <div>
        <Image src='/img/tfkhdyt-avatar.svg' alt='tfkhdyt avatar' width={300} height={300} />
      </div>
    </div>
  );
}
