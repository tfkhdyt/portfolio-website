import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { variants } from '@/animations/variants';

import GradientText from '../GradientText';
import SocialMediaIcons from '../SocialMediaIcons';
import styles from './Hero.module.css';

const Hero = () => {
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

  const handleArrow = () => {
    document.querySelector('#about')!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div
      className='hero top-0 -mt-20 min-h-screen w-screen bg-gradient-to-bl from-blue-500/10 via-base-100 to-base-100 pb-px'
      id='hero'
    >
      <div className='hero-content'>
        <div className='max-w-md px-4 md:max-w-3xl lg:max-w-5xl'>
          <div className='grid grid-cols-1 items-center gap-x-4 md:grid-cols-2'>
            <motion.div
              variants={variants}
              initial='fromLeft'
              animate='toRight'
            >
              <h1 className='text-2xl font-bold md:text-4xl'>Hi, my name is</h1>
              <h1 className='bg-gradient-to-br from-sky-400 to-blue-700 bg-clip-text py-2 text-4xl font-extrabold text-transparent md:text-6xl'>
                Taufik Hidayat
              </h1>
              <p className='pt-2 pb-4 font-medium md:text-xl'>
                I'm a{' '}
                <GradientText
                  from='from-rose-400'
                  to='to-violet-600'
                  style='inline font-semibold'
                >
                  Junior Full Stack Developer
                </GradientText>{' '}
                from Bandung, Indonesia
              </p>
              <div className='text-base-content'>
                <SocialMediaIcons
                  variants={variants}
                  initial='hidden'
                  animate='visible'
                  transition={{
                    duration: 1,
                  }}
                />
              </div>
              <Link href='https://drive.google.com/file/d/1NJcXYr5SZNkxt03KKaiDNNYoc2_cCWBj/view?usp=sharing'>
                <a
                  className='flex justify-center items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 mt-6 space-x-2 w-fit'
                  target='_blank'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='h-5 w-5'
                  >
                    <path d='M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479 6.908l-4-4h3v-4h2v4h3l-4 4z' />
                  </svg>
                  <span>Download CV</span>
                </a>
              </Link>
            </motion.div>
            <motion.div
              variants={variants}
              initial='fromBottom'
              animate='toTop'
              className='hidden md:flex'
            >
              <Image
                src='/illustration3.svg'
                height={500}
                width={500}
                objectFit='scale-down'
              />
              {/* <img src='/illustration3.svg' className='pointer-events-none' /> */}
            </motion.div>
          </div>
          <motion.div
            variants={variants}
            initial='startFade'
            animate='endFade'
            className='grid place-items-center'
            onClick={handleArrow}
          >
            <svg
              width='40px'
              height='100%'
              viewBox='0 0 247 390'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              // xmlns:xlink='http://www.w3.org/1999/xlink'
              className={`-mb-80 md:-mb-72 lg:-mb-32 h-10 w-10 ${
                scrollY >= 140 && 'pointer-events-none opacity-0'
              } transition-all duration-500 [fill-rule:evenodd] [clip-rule:evenodd] [stroke-linecap:round] [stroke-linejoin:round] [stroke-miterlimit:1.5] cursor-pointer`}
            >
              <path
                id='wheel'
                d='M123.359,79.775l0,72.843'
                className={`[fill:none] [stroke-width:20px] ${styles.wheel}`}
                stroke='currentColor'
              />
              <path
                id='mouse'
                d='M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z'
                className='[fill:none] [stroke-width:20px]'
                stroke='currentColor'
              />
            </svg>

            {/*
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={`-mb-80 md:-mb-32 h-10 w-10 animate-bounce ${
                scrollY >= 140 && 'pointer-events-none opacity-0'
              } transition-all duration-500`}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 14l-7 7m0 0l-7-7m7 7V3'
              />
            </svg>
            */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
