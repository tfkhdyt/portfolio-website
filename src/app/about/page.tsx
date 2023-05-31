import AboutMeSection from '@/components/About/AboutMeSection';
import EducationSection from '@/components/About/EducationSection';
import WorkExperienceSection from '@/components/About/WorkExperienceSection';

const AboutPage = () => {
  return (
    <main className='space-y-8'>
      <AboutMeSection />
      <EducationSection />
      <WorkExperienceSection />
    </main>
  );
};

export default AboutPage;
