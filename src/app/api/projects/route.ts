import { authOptions } from '@/lib/nextAuth';
import { projectService } from '@/project/ProjectService';
import { HTTPError, UnauthenticatedError, UnprocessableEntityError } from '@/utils/error';

import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const createProjectSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .max(50, 'Name must not exceed 50 characters'),
  desc: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }),
  photo: z.instanceof(File),
  techStack: z.array(
    z.string({
      required_error: 'Tech stack is required',
      invalid_type_error: 'Tech stack must be a string',
    }).cuid('Tech stack is invalid'),
  ),
  repoUrl: z
    .string({
      invalid_type_error: 'Repository URL must be a string',
    })
    .url('Repository URL must be a valid URL')
    .optional().or(z.literal('')),
  demoUrl: z
    .string({
      invalid_type_error: 'Demo URL must be a string',
    })
    .url('Demo URL must be a valid URL')
    .optional().or(z.literal('')),
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

    const result = createProjectSchema.safeParse({
      name: formData.get('name'),
      desc: formData.get('desc'),
      photo: formData.get('photo'),
      techStack: JSON.parse(formData.get('techStack') as string),
      repoUrl: formData.get('repoUrl'),
      demoUrl: formData.get('demoUrl'),
      categoryId: formData.get('category'),
    });
    if (!result.success) {
      throw new UnprocessableEntityError(result.error.issues[0].message);
    }

    const response = await projectService.createProject({
      name: result.data.name,
      desc: result.data.desc,
      repoUrl: result.data.repoUrl,
      demoUrl: result.data.demoUrl,
      photo: result.data.photo,
      techStack: result.data.techStack,
      categoryId: result.data.categoryId,
    });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof HTTPError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    return NextResponse.json({ error: 'Failed to create new project' }, { status: 500 });
  }
};
