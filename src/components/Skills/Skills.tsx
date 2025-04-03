import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { variants } from '@/animations/variants';

import { skills } from './data';
import SkillBox from './SkillBox';

const About = () => {
  const [category] = useState<string[]>([
    ...new Set(skills.map((value) => value.type)),
  ]);
  const [activeTab, setActiveTab] = useState(category[0]);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const handleTabClick = (name: string) => {
    setActiveTab(name);
    if (isFirstRender) setIsFirstRender(false);
  };

  return (
    <div>
      {/* content */}
      <div
        className='mb-8 w-screen scroll-mt-8 bg-base-100 py-16 text-base-content'
        id='skills'
      >
        <div className='container mx-auto space-y-10 px-6 md:h-[52rem] lg:h-[60rem] md:px-12 lg:px-56'>
          {/* title */}
          <motion.div
            variants={variants}
            initial='fromBottom'
            whileInView='toTop'
            viewport={{ once: true }}
            className='flex w-full justify-center text-3xl font-black'
          >
            Skills
          </motion.div>
          <div className='space-y-8'>
            <motion.div
              variants={variants}
              initial='fromBottom'
              whileInView='toTop'
              viewport={{ once: true }}
              className='tabs flex flex-nowrap justify-start overflow-x-auto lg:justify-center'
            >
              {category.map((value) => (
                <a
                  onClick={() => handleTabClick(value)}
                  className={`tab tab-bordered ${
                    activeTab === value && 'tab-active'
                  } shrink-0 space-x-2 transition-all duration-500 umami--click--${value.replace(
                    /\s+/g,
                    '-'
                  )}-tab`}
                  key={value}
                >
                  <span>{value}</span>
                  <span className={`badge badge-outline badge-sm`}>
                    {skills.filter((e) => e.type === value).length}
                  </span>
                </a>
              ))}
            </motion.div>
            <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
              <AnimatePresence exitBeforeEnter>
                {skills
                  .filter((value) => value.type === activeTab)
                  .map((value) => (
                    <div
                      className='tooltip'
                      data-tip={value.title}
                      key={value.title}
                    >
                      <SkillBox
                        title={value.title}
                        icon={value.icon}
                        isMainSkill={value.isMainSkill}
                        variants={variants}
                        key={value.title}
                        isFirstRender={isFirstRender}
                      />
                    </div>
                  ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      {/* ======== */}
    </div>
  );
};

export default About;
