import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { variants } from '@/animations/variants';

import { projects } from './data';
import { ProjectType } from './index.d';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const category = Object.values(ProjectType);
  const [activeTab, setActiveTab] = useState(ProjectType.WEB);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const handleTabClick = (name: ProjectType) => {
    setActiveTab(name);
    if (isFirstRender) setIsFirstRender(false);
  };

  return (
    <div>
      {/* content */}
      <div
        className='mb-8 w-screen scroll-mt-8 bg-base-100 py-16 text-base-content'
        id='projects'
      >
        <div className='container mx-auto space-y-10 px-6 md:px-12 lg:px-56'>
          {/* title */}
          <motion.div
            variants={variants}
            initial='fromBottom'
            whileInView='toTop'
            viewport={{ once: true }}
            className='flex w-full justify-center text-3xl font-black'
          >
            Projects
          </motion.div>
          {/* category */}
          <div className='space-y-8'>
            <motion.div
              variants={variants}
              initial='fromBottom'
              whileInView='toTop'
              viewport={{ once: true }}
              className='tabs flex flex-nowrap overflow-x-auto md:justify-center'
            >
              {category.map((value) => (
                <a
                  onClick={() => handleTabClick(value)}
                  className={`tab tab-bordered ${
                    activeTab === value && 'tab-active'
                  } shrink-0 space-x-2 transition-all duration-500 umami--click--${value}-tab`}
                  key={value}
                >
                  <span>{value}</span>
                  <span className={`badge badge-outline badge-sm`}>
                    {projects.filter((e) => e.type === value).length}
                  </span>
                </a>
              ))}
            </motion.div>
            {/* content */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              <AnimatePresence exitBeforeEnter>
                {projects
                  .filter((value) => value.type === activeTab)
                  .map((value) => (
                    <div key={value.name}>
                      <ProjectCard
                        variants={variants}
                        name={value.name}
                        type={value.type}
                        description={value.description}
                        tags={value.tags}
                        picture={value.picture}
                        repoLink={value.repoLink}
                        key={value.name}
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

export default Projects;
