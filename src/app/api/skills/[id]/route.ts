import { skillService } from '@/skill/SkillService';
import { HTTPError, UnprocessableEntityError } from '@/utils/error';

import { NextResponse } from 'next/server';
import { z } from 'zod';

const updateSkillSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .max(12, 'Name must not exceed 12 characters')
    .optional(),
  categoryId: z
    .string({
      invalid_type_error: 'Category id must be a string',
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

    const result = updateSkillSchema.safeParse({ name, categoryId });
    if (!result.success) {
      throw new UnprocessableEntityError(result.error.issues[0].message);
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

export const DELETE = async (_: Request, {
  params,
}: {
  params: { id: string };
}) => {
  const id = params.id;

  try {
    const response = await skillService.deleteSkill(id);

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof HTTPError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    return NextResponse.json({
      error: `Failed to delete skill with id ${id}`,
    }, { status: 500 });
  }
};
