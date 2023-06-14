import SkillCards from '@/components/Skills/SkillCards';
import Title from '@/components/Title';
import { skillService } from '@/skill/SkillService';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills - Taufik Hidayat',
};

export const revalidate = 0;

const SkillsPage = async () => {
  const [{ data: skills }, { data: skillCategories }] = await Promise.all([
    skillService.getAllSkills(),
    skillService.getAllCategories(),
  ]);

  return (
    <main>
      <Title>Skills</Title>
      <SkillCards skills={skills} skillCategories={skillCategories} />
    </main>
  );
};

export default SkillsPage;
