import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { variants } from '@/animations/variants';

import GradientText from '../GradientText';
import { about } from './data';

const About = () => {
  return (
    <div className='mt-2 w-screen'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
        className='fill-blue-500'
      >
        <path
          fillOpacity='1'
          d='M0,32L48,53.3C96,75,192,117,288,117.3C384,117,480,75,576,58.7C672,43,768,53,864,74.7C960,96,1056,128,1152,144C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
        ></path>
      </svg>
      {/* content */}
      <div className='-my-px scroll-mt-24 bg-blue-500 text-base-100' id='about'>
        <div className='container mx-auto space-y-10 px-6 md:px-12 lg:px-56'>
          {/* title */}
          <motion.div
            variants={variants}
            initial='fromBottom'
            whileInView='toTop'
            viewport={{ once: true }}
            className='flex w-full justify-center text-3xl font-black'
          >
            About
          </motion.div>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            <div className='flex justify-center'>
              <motion.div
                variants={variants}
                initial='fromBottom'
                whileInView='toTop'
                viewport={{ once: true }}
                className='avatar'
              >
                {/* <div className='w-36 md:w-5/6'>
                  <Image
                    src={about.picture}
                    width={500}
                    height={500}
                    className='rounded-full'
                    alt='Foto gweh'
                  />
                </div> */}
                <div className='group relative aspect-square h-fit w-36 rounded-full bg-base-100 md:w-5/6'>
                  <div>
                    <Image
                      src='/tfkhdyt_avatar.jpg'
                      width={500}
                      height={500}
                      className='absolute transition-all duration-500 ease-in-out group-hover:translate-y-4 group-hover:translate-x-0.5 md:group-hover:translate-x-2 group-hover:scale-125 md:group-hover:translate-y-6'
                      alt='Foto gweh'
                    />
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.div
              variants={variants}
              initial='fromBottom'
              whileInView='toTop'
              viewport={{ once: true }}
              className='flex flex-col justify-start space-y-4 text-justify'
            >
              <p>
                Hi everyone, my name is{' '}
                <GradientText
                  from='from-rose-600'
                  to='to-indigo-600'
                  style='inline font-bold'
                >
                  Taufik Hidayat
                </GradientText>
                . I'm a Junior Full Stack Developer, Computer Science Student,
                YouTuber, Free/Libre and Open Source Software Enthusiast, and
                Google-fu.
              </p>
              {about.description.map((value, i) => {
                let arr: string[] = [];
                if (i == 3) {
                  arr = value.split('|');
                  return (
                    <div className='inline' key={i}>
                      {arr[0]}
                      <span>
                        and here's my{' '}
                        <Link href='https://youtube.com/playlist?list=PLN3wrmCuWZNHsNley2YK7G7KxU0ga5ESB'>
                          <a
                            className='umami--click--music-playlist-link underline decoration-yellow-400 decoration-dotted decoration-3 underline-offset-4 transition-all duration-500 hover:font-bold hover:text-yellow-400'
                            target='_blank'
                          >
                            music playlist.
                          </a>
                        </Link>
                      </span>
                      {arr[1]}
                    </div>
                  );
                }
                return (
                  <span key={i}>
                    <p>{value}</p>
                  </span>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
      {/* ======== */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
        className='fill-blue-500 [fillRule:evenodd] [clipRule:evenodd] [strokeLinejoin:round] [strokeMiterlimit:1.41421]'
      >
        <path d='M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,186.7C672,181,768,203,864,208C960,213,1056,203,1152,208C1248,213,1344,235,1392,245.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'></path>
      </svg>
    </div>
  );
};

export default About;
