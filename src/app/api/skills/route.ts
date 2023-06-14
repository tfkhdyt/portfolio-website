import { authOptions } from '@/lib/nextAuth';
import { skillService } from '@/skill/SkillService';
import { HTTPError, UnauthenticatedError, UnprocessableEntityError } from '@/domains/error/ErrorEntity';

import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const createSkillSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .max(12, 'Name must not exceed 12 characters'),
  categoryId: z
    .string({
      required_error: 'Category id is required',
      invalid_type_error: 'Category id must be a string',
    })
    .cuid('Category id is invalid'),
});

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new UnauthenticatedError('You should login first to access this endpoint');
    }

    const formData = await req.formData();

    const result = createSkillSchema.safeParse({
      name: formData.get('name'),
      categoryId: formData.get('category'),
    });
    if (!result.success) {
      throw new UnprocessableEntityError(result.error.issues[0].message);
    }

    const photo = formData.get('photo') as File;

    const response = await skillService.createSkill({
      name: result.data.name,
      categoryId: result.data.categoryId,
      photo,
    });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof HTTPError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    return NextResponse.json({ error: 'Failed to create new skill' }, { status: 500 });
  }
};
