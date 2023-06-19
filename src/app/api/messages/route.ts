import { HTTPError, UnprocessableEntityError } from '@/domains/error/ErrorEntity';
import { messageService } from '@/message/MessageService';

import { NextResponse } from 'next/server';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name should be in string',
  }).min(3, 'Name should be at least 3 characters'),

  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email should be in string',
  }).email('Email is invalid'),

  message: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email should be in string',
  }).max(256, 'Message should not longer than 256 characters'),

  token: z.string({
    required_error: 'Captcha token is required',
    invalid_type_error: 'Captcha token should be in string',
  }),
});

export async function POST(request: Request) {
  try {
    const { name, email, message, token } = await request.json();

    const result = formSchema.safeParse({ name, email, message, token });
    if (!result.success) {
      throw new UnprocessableEntityError(result.error.issues[0].message);
    }

    await messageService.verifyCaptchaToken(token);

    const response = await messageService.sendMessage(result.data);

    return NextResponse.json({ message: response.message });
  } catch (error) {
    if (error instanceof HTTPError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
