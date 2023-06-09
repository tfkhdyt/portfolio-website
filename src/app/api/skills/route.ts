import { skillService } from '@/skill/SkillService';
import { HTTPError } from '@/utils/error';

import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const categoryId = formData.get('category') as string;
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
