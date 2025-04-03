import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { themeChange } from 'theme-change';

import { variants } from '@/animations/variants';
import GradientText from '@/components/GradientText';

const _404 = () => {
  const router = useRouter();
  const params = router.asPath.slice(1);

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <Head>
        <title>What is {params}?</title>
      </Head>
      <div className='min-h-screen min-w-screen grid place-items-center'>
        <motion.div
          variants={variants}
          initial='fromBottom'
          animate='toTop'
          exit='fromBottom'
          key='404'
          transition={{ duration: 1.5, type: 'tween', ease: 'backInOut' }}
          className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md items-center container px-4 md:max-w-3xl lg:max-w-5xl -mt-24 md:-mt-0'
        >
          <div className='mx-auto w-10/12 md:w-full md:order-last'>
            <Link href='https://storyset.com/people'>
              <a target='_blank'>
                <Image src='/404.svg' alt='404' width={850} height={750} />
              </a>
            </Link>
          </div>
          <div className='space-y-4 px-4'>
            <GradientText
              from='from-sky-400'
              to='to-blue-600'
              style='font-black text-4xl md:text-5xl'
            >
              Oops!
            </GradientText>
            <p className='font-medium text-base-content md:text-2xl'>
              You're visiting a page that doesn't exist
            </p>
            <Link href='/'>
              <a className='btn btn-outline flex items-center w-fit space-x-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
                    clipRule='evenodd'
                  />
                </svg>
                <p>Back to homepage</p>
              </a>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );

  /* return (
    <div className='min-h-screen min-w-screen grid place-items-center'>
        <div className='w-full'>
          <img src="/404.svg" alt="404" className='w-full' />
        </div>
        <div className='w-full flex flex-col'>
          <GradientText
            from='from-sky-400'
            to='to-blue-600'
            style='font-black text-3xl'
          >
            Oops...
          </GradientText>
          <p className='font-medium'>You're visiting a page that doesn't exist</p>
        </div>
      </div>
      ) */
};

export default _404;
