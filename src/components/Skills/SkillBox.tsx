import { motion } from 'framer-motion';
// import Image from 'next/image';

import { ISkillBox } from './index.d';

const SkillBox = ({
  title,
  icon,
  isMainSkill,
  variants,
  isFirstRender,
}: ISkillBox) => (
  <motion.div
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
  >
    <div
      className={`space-y-2 rounded-2xl bg-base-200 p-8 lg:p-10 shadow shadow-base-content/20 transition duration-500 hover:bg-base-300 w-full aspect-square flex justify-center items-center relative`}
    >
      {isMainSkill && (
        <div className='absolute top-3 left-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='15'
            height='15'
            viewBox='0 0 24 24'
            className='fill-warning'
          >
            <path d='M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z' />
          </svg>
        </div>
      )}
      {icon ? (
        // <Image
        //   src={`/icons/${icon}`}
        //   alt={title}
        //   // className='h-10 md:h-22 lg:h-24'
        //   // layout='responsive'
        //   width={200}
        //   height={200}
        //   objectFit='scale-down'
        // />
        <img
          src={`/icons/${icon}`}
          alt={title}
          className={`object-contain h-20 md:h-22 lg:h-24`}
        />
      ) : (
        // <img
        //   src={`/icons/${icon}`}
        //   alt={`${title} icon`}
        //   className={`object-contain h-20 md:h-22 lg:h-24`}
        // />
        <p className='flex justify-center font-semibold leading-none text-base-content'>
          {title}
        </p>
      )}
    </div>
  </motion.div>
);

export default SkillBox;
