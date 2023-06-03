import SkillCards from '@/components/Skills/SkillCards';
import Title from '@/components/Title';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills - Taufik Hidayat',
};

const SkillsPage = () => {
  return (
    <main>
      <Title>Skills</Title>
      <SkillCards />
    </main>
  );
};

export default SkillsPage;
