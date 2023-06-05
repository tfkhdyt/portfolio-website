import { skills } from '../skills';
import { apiProjects } from './api';
import { botProjects } from './bot';
import { cliProjects } from './cli';
import { webProjects } from './web';

export const projectCategories = ['Web', 'API', 'CLI', 'Bot'] as const;

export type Category = typeof projectCategories[number];

const techStack = [...skills.map((skill) => skill.name)] as const;

type TechStack = typeof techStack[number];

export type Project = {
  name: string;
  desc: string;
  photoUrl: string;
  category: Category;
  techStack: TechStack[];
  url?: {
    repo?: string;
    demo?: string;
  };
};

export const projects: Project[] = [
  ...webProjects,
  ...apiProjects,
  ...cliProjects,
  ...botProjects,
];
