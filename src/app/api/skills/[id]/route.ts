import { authOptions } from '@/lib/nextAuth';
import { skillService } from '@/skill/SkillService';
import { BadRequestError, HTTPError, UnauthenticatedError, UnprocessableEntityError } from '@/utils/error';

import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const updateSkillSchema = z.object({
  id: z
    .string({
      required_error: 'Id is required',
      invalid_type_error: 'id must be a string',
    })
    .cuid('Id is invalid'),
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
  photo: z.instanceof(File).or(z.null()),
});

export const PUT = async (req: Request, {
  params,
}: {
  params: { id: string };
}) => {
  const id = params.id;

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new UnauthenticatedError('You should login first to access this endpoint');
    }

    const formData = await req.formData();

    const result = updateSkillSchema.safeParse({
      id,
      name: formData.get('name'),
      categoryId: formData.get('category'),
      photo: formData.get('photo'),
    });
    if (!result.success) {
      throw new UnprocessableEntityError(result.error.issues[0].message);
    }

    const response = await skillService.updateSkill(result.data.id, {
      name: result.data.name,
      categoryId: result.data.categoryId,
      photo: result.data.photo ?? undefined,
    });

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

const deleteSkillSchema = z.object({
  id: z
    .string({
      required_error: 'Id is required',
      invalid_type_error: 'id must be a string',
    })
    .cuid('Id is invalid'),
});

export const DELETE = async (_: Request, {
  params,
}: {
  params: { id: string };
}) => {
  const id = params.id;

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new UnauthenticatedError('You should login first to access this endpoint');
    }

    const result = deleteSkillSchema.safeParse({ id });
    if (!result.success) {
      throw new BadRequestError(result.error.issues[0].message);
    }

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
