import { skillService } from '@/skill/SkillService';
import { HTTPError, UnprocessableEntityError } from '@/utils/error';

import { NextResponse } from 'next/server';
import { z } from 'zod';

const createSkillSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name should be in string',
    })
    .max(12, 'Name should not be more than 12 characters'),
  categoryId: z
    .string({
      required_error: 'Category id is required',
      invalid_type_error: 'Category id should be in string',
    })
    .cuid('Category id is invalid'),
});

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const categoryId = formData.get('category') as string;

    const { success } = createSkillSchema.safeParse({ name, categoryId });
    if (!success) {
      throw new UnprocessableEntityError('Request body is not valid');
    }

    const photo = formData.get('photo') as File;

    const response = await skillService.createSkill({ name, categoryId, photo });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof HTTPError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    return NextResponse.json({ error: 'Failed to create new skill' }, { status: 500 });
  }
};
