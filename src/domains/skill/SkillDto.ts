export type CreateSkillRequest = {
  name: string;
  categoryId: string;
  photo: File;
};

export type UpdateSkillRequest = {
  name?: string;
  categoryId?: string;
  photo?: File;
};
