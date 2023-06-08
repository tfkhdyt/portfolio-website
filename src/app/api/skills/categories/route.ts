import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const skillCategories = await prisma.skillCategory.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    return NextResponse.json(skillCategories);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({
        error: error.message,
      }, { status: 500 });
    }
  }
};
