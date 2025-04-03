import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { trackEvent } from '@/lib/analytics/trackEvent';

import { IProjectCard } from './index.d';

const ProjectCard = ({
  variants,
  name,
  description,
  tags,
  picture,
  repoLink,
  isFirstRender,
}: IProjectCard) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonClickable, setIsButtonClickable] = useState(false);
  const _name = name.replace(/\s+/g, '-');

  const onHover = () => {
    setTimeout(() => {
      setIsButtonClickable(true);
    }, 100);
    setIsHovered(true);
  };

  const onLeave = () => {
    setIsButtonClickable(false);
    setIsHovered(false);
  };

  return (
    <motion.div
      key={name}
      variants={variants}
      initial='fromLeft'
      whileInView='toRight'
      exit='exitToRight'
      transition={{
        duration: isFirstRender ? 1.5 : 0.75,
        type: 'tween',
        ease: 'backInOut',
      }}
      viewport={{ once: true }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg transition duration-500 ease-in-out ${
          isHovered && 'ring ring-[#3ABFF8]'
        }`}
      >
        <div
          className={`absolute inset-0 z-10 grid aspect-video h-full w-full place-items-center rounded-2xl bg-base-200/90 px-4 py-3 text-center text-base-content transition duration-500 ${
            isHovered ? 'opacity-1' : 'opacity-0'
          }`}
        >
          <div>
            <p className='text-xl font-bold'>{name}</p>
            <p className='text-sm font-light'>{description}</p>
            <div className='space-x-1'>
              {tags.map((tag) => (
                <div
                  data-theme='light'
                  className='badge badge-sm badge-info py-2 font-bold text-base-content'
                  key={tag}
                >
                  {tag}
                </div>
              ))}
            </div>
            <div
              /* className={`umami--click--${_name}-repo-link`} */ onClick={() =>
                trackEvent(_name + '-repo-link', 'click')
              }
            >
              <Link href={repoLink}>
                <a
                  //  data-theme='dracula'
                  className={`group btn btn-outline btn-xs mt-1.5 ${
                    isButtonClickable || 'pointer-events-none'
                  }`}
                  target='_blank'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    className='mr-1 h-3.5 w-3.5 fill-base-content transition duration-300 group-hover:invert'
                  >
                    <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                  </svg>
                  Open in GitHub
                </a>
              </Link>
            </div>
          </div>
        </div>
        <Image
          src={`/projects/${picture}`}
          className={`inset-0 aspect-video ${
            isHovered && 'scale-125'
          } rounded-2xl transition duration-500 ease-in-out`}
          layout='fill'
          alt={`${name} thumbnail`}
          placeholder='blur'
          //blurDataURL={`/projects/${picture}`}
          blurDataURL='/placeholder.webp'
          // priority
        />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
