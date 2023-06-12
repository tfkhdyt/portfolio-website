import SkillCards from '@/components/Skills/SkillCards';
import Title from '@/components/Title';
import { prisma } from '@/lib/prisma';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills - Taufik Hidayat',
};

export const revalidate = 0;

const SkillsPage = async () => {
  const [skills, skillCategories] = await Promise.all([
    prisma.skill.findMany({ orderBy: { id: 'asc' } }),
    prisma.skillCategory.findMany({ orderBy: { id: 'asc' } }),
  ]);

  return (
    <main>
      <Title>Skills</Title>
      <SkillCards skills={skills} skillCategories={skillCategories} />
    </main>
  );
};

export default SkillsPage;
