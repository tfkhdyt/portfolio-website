'use client';

import Tabs from '../Tabs';
import Card from './Card';
import CreateSkillModal from './CreateSkillModal';

import { Skill, SkillCategory } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

type Props = {
	skills: Skill[];
	skillCategories: SkillCategory[];
};

const SkillCards = ({ skills, skillCategories }: Props) => {
	const [currentCategory, setCurrentCategory] = useState<SkillCategory>(
		skillCategories[0],
	);
	const { data: session } = useSession();

	return (
		<>
			<main className='mt-2'>
				<div className='text-sm font-medium text-center text-gray-500 border-b border-gray-200 md:text-base dark:text-gray-400 dark:border-gray-700'>
					<Tabs
						items={[...skillCategories]}
						current={currentCategory}
						setter={setCurrentCategory}
					/>
				</div>
				<div className='grid grid-cols-2 gap-6 mt-6 md:grid-cols-4'>
					{skills
						.filter((skill) => skill.categoryId === currentCategory.id)
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
							key='add-skill-btn'
						/>
					) : null}
				</div>
			</main>
		</>
	);
};

export default SkillCards;
