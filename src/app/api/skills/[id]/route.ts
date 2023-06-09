import { imagekit } from '@/lib/imagekit';
import { prisma } from '@/lib/prisma';
import { skillService } from '@/skill/SkillService';
import { HTTPError, UnprocessableEntityError } from '@/utils/error';
import { verifyCategoryId } from '@/utils/verifyCategoryId';

import { NextResponse } from 'next/server';
import { z } from 'zod';

const updateSkillSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name should be in string',
    })
    .max(12, 'Name should not be more than 12 characters')
    .optional(),
  categoryId: z
    .string({
      invalid_type_error: 'Category id should be in string',
    })
    .cuid('Category id is invalid')
    .optional(),
});

export const PUT = async (req: Request, {
  params,
}: {
  params: { id: string };
}) => {
  const id = params.id;
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string | undefined;
    const categoryId = formData.get('category') as string | undefined;

    const { success } = updateSkillSchema.safeParse({ name, categoryId });
    if (!success) {
      throw new UnprocessableEntityError('Request body is not valid');
    }

    const photo = formData.get('photo') as File | undefined;

    const response = await skillService.updateSkill(id, { name, categoryId, photo });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof HTTPError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    return NextResponse.json({
      error: `Failed to update skill with id ${id}`,
    }, { status: 500 });
  }
};
