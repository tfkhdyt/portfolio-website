import { Prisma, Skill, SkillCategory } from '@prisma/client';

export default interface SkillRepository {
  getAllSkillsFromDB(): Promise<Skill[]>;
  getAllSkillsFromCache(): Promise<Skill[] | null>;
  getAllCategoriesFromDB(): Promise<SkillCategory[]>;
  getAllCategoriesFromCache(): Promise<SkillCategory[] | null>;
  createSkill(skill: Prisma.SkillCreateInput): Promise<Skill>;
  getSkillCategoryById(categoryId: string): Promise<SkillCategory>;
  getSkillById(skillId: string): Promise<Skill>;
  updateSkill(skillId: string, skill: Prisma.SkillUpdateInput): Promise<Skill>;
  deleteSkill(skillId: string): Promise<void>;
}
