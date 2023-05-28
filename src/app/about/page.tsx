import AboutMeSection from '@/components/About/AboutMeSection';
import EducationSection from '@/components/About/EducationSection';
import React from 'react';

const AboutPage = () => {
  return (
    <div className='space-y-8'>
      <AboutMeSection />
      <EducationSection />
    </div>
  );
};

export default AboutPage;
