import { authOptions } from '@/lib/nextAuth';
import { projectService } from '@/project/ProjectService';
import {
  BadRequestError,
  HTTPError,
  UnauthenticatedError,
  UnprocessableEntityError,
} from '@/domains/error/ErrorEntity';

import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const updateProjectSchema = z.object({
  id: z
    .string({
      required_error: 'Id is required',
      invalid_type_error: 'id must be a string',
    })
    .cuid('Id is invalid'),
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .max(50, 'Name must not exceed 50 characters'),
  desc: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string',
  }),
  techStack: z.array(
    z
      .string({
        required_error: 'Tech stack is required',
        invalid_type_error: 'Tech stack must be a string',
      })
      .cuid('Tech stack is invalid'),
  ),
  repoUrl: z
    .string({
      invalid_type_error: 'Repository URL must be a string',
    })
    .url('Repository URL must be a valid URL')
    .optional()
    .or(z.literal('')),
  demoUrl: z
    .string({
      invalid_type_error: 'Demo URL must be a string',
    })
    .url('Demo URL must be a valid URL')
    .optional()
    .or(z.literal('')),
  categoryId: z
    .string({
      required_error: 'Category id is required',
      invalid_type_error: 'Category id must be a string',
    })
    .cuid('Category id is invalid'),
});

export const PUT = async (
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  },
) => {
  const id = params.id;

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new UnauthenticatedError(
        'You should login first to access this endpoint',
      );
    }

    const formData = await req.formData();

    const result = updateProjectSchema.safeParse({
      id,
      name: formData.get('name'),
      desc: formData.get('desc'),
      techStack: JSON.parse(formData.get('techStack') as string),
      repoUrl: formData.get('repoUrl'),
      demoUrl: formData.get('demoUrl'),
      categoryId: formData.get('category'),
    });
    if (!result.success) {
      console.error(result.error);
      throw new UnprocessableEntityError(result.error.issues[0].message);
    }

    const photo = formData.get('photo') as File | undefined;

    const response = await projectService.updateProject(result.data.id, {
      name: result.data.name,
      desc: result.data.desc,
      repoUrl: result.data.repoUrl,
      demoUrl: result.data.demoUrl,
      photo,
      techStack: result.data.techStack,
      categoryId: result.data.categoryId,
    });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof HTTPError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode },
      );
    }

    return NextResponse.json(
      {
        error: `Failed to update project with id ${id}`,
      },
      { status: 500 },
    );
  }
};

const deleteProjectSchema = z.object({
  id: z
    .string({
      required_error: 'Id is required',
      invalid_type_error: 'id must be a string',
    })
    .cuid('Id is invalid'),
});

export const DELETE = async (
  _: Request,
  {
    params,
  }: {
    params: { id: string };
  },
) => {
  const id = params.id;

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new UnauthenticatedError(
        'You should login first to access this endpoint',
      );
    }

    const result = deleteProjectSchema.safeParse({ id });
    if (!result.success) {
      throw new BadRequestError(result.error.issues[0].message);
    }

    const response = await projectService.deleteProject(id);

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof HTTPError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode },
      );
    }

    return NextResponse.json(
      {
        error: `Failed to delete skill with id ${id}`,
      },
      { status: 500 },
    );
  }
};
