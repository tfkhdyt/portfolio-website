import { Prisma, Skill, SkillCategory } from '@prisma/client';

export default interface SkillRepository {
  createSkill(skill: Prisma.SkillCreateInput): Promise<Skill>;
  getSkillCategoryById(categoryId: string): Promise<SkillCategory>;
}
