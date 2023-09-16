'use client';

import { useSearchParams } from 'next/navigation';
import Tabs from '../Tabs';
import Card from './Card';
import CreateSkillModal from './CreateSkillModal';

import { Skill, SkillCategory } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { z } from 'zod';

type Props = {
  skills: (Skill & {
    category: {
      name: string;
    } | null;
  })[];
  skillCategories: SkillCategory[];
};

const CategorySchema = z
  .enum(['Language', 'Framework', 'Library', 'DBMS'])
  .catch('Language');

const SkillCards = ({ skills, skillCategories }: Props) => {
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const currentCategory = CategorySchema.parse(searchParams.get('category'));

  return (
    <>
      <main className="mt-2">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 md:text-base dark:text-gray-400 dark:border-gray-700">
          <Tabs
            items={[...skillCategories]}
            currentCategory={currentCategory}
          />
        </div>
        <div className="grid grid-cols-2 gap-6 mt-6 md:grid-cols-4">
          {skills
            .filter((skill) => skill.category?.name === currentCategory)
            .map((skill) => (
              <Card
                skill={skill}
                skillCategories={skillCategories}
                currentCategory={currentCategory}
                key={skill.name}
              />
            ))}
          {session ? (
            <CreateSkillModal
              skillCategories={skillCategories}
              currentCategory={currentCategory}
              key="add-skill-btn"
            />
          ) : null}
        </div>
      </main>
    </>
  );
};

export default SkillCards;
