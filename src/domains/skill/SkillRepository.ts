import { Prisma, Skill, SkillCategory } from '@prisma/client';

export type SkillWithCategory = Skill & {
  category: {
    name: string;
  } | null;
};

export default interface SkillRepository {
  getAllSkillsFromDB(): Promise<SkillWithCategory[]>;
  getAllSkillsFromCache(): Promise<SkillWithCategory[] | null>;
  getAllCategoriesFromDB(): Promise<SkillCategory[]>;
  getAllCategoriesFromCache(): Promise<SkillCategory[] | null>;
  createSkill(skill: Prisma.SkillCreateInput): Promise<Skill>;
  getSkillCategoryById(categoryId: string): Promise<SkillCategory>;
  getSkillById(skillId: string): Promise<Skill>;
  updateSkill(skillId: string, skill: Prisma.SkillUpdateInput): Promise<Skill>;
  deleteSkill(skillId: string): Promise<void>;
}
