import AboutMeSection from '@/components/About/AboutMeSection';
import EducationSection from '@/components/About/EducationSection';
import WorkExperienceSection from '@/components/About/WorkExperienceSection';
import React from 'react';

const AboutPage = () => {
  return (
    <div className='space-y-8'>
      <AboutMeSection />
      <EducationSection />
      <WorkExperienceSection />
    </div>
  );
};

export default AboutPage;
