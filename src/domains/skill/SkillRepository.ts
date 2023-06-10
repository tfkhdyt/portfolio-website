import { Prisma, Skill, SkillCategory } from '@prisma/client';

export default interface SkillRepository {
  createSkill(skill: Prisma.SkillCreateInput): Promise<Skill>;
  getSkillCategoryById(categoryId: string): Promise<SkillCategory>;
  getSkillById(skillId: string): Promise<Skill>;
  updateSkill(skillId: string, skill: Prisma.SkillUpdateInput): Promise<Skill>;
  deleteSkill(skillId: string): Promise<void>;
}