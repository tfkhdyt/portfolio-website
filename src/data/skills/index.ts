import { dbmsSkills } from './dbms';
import { frameworkSkills } from './framework';
import { languageSkills } from './language';
import { librarySkills } from './library';

export const skillCategories = ['Language', 'Framework', 'Library', 'DBMS'] as const;

export type Category = typeof skillCategories[number];

export type Skill = {
  name: string;
  category: Category;
  photoUrl: string;
};

export const skills: Skill[] = [
  ...languageSkills,
  ...frameworkSkills,
  ...librarySkills,
  ...dbmsSkills,
];
