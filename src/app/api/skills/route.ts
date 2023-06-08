import { imagekit } from '@/lib/imagekit';
import { prisma } from '@/lib/prisma';

import { NextResponse } from 'next/server';

const verifyCategoryId = async (categoryId: string): Promise<void> => {
  try {
    const category = await prisma.skillCategory.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new Error('Category id is not found');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const categoryId = formData.get('category') as string;
    await verifyCategoryId(categoryId);
    const file = formData.get('photo') as File;

    const photoArrayBuffer = await file.arrayBuffer();

    const { url } = await imagekit.upload({
      file: Buffer.from(photoArrayBuffer),
      fileName: file.name,
    });

    const createdSkill = await prisma.skill.create({
      data: {
        name,
        categoryId,
        photoUrl: url,
      },
    });

    return NextResponse.json({ data: createdSkill });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
