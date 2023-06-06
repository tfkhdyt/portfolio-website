import { telegraf } from '@/lib/telegraf';
import { NextResponse } from 'next/server';

const ADMIN_ID = process.env.ADMIN_ID as string;

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  const _message = `*${name} (${email}) says:*
${message}`;

  try {
    await telegraf.telegram.sendMessage(ADMIN_ID, _message, {
      parse_mode: 'Markdown',
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return NextResponse.json({
        message: error.message,
      }, {
        status: 500,
      });
    }
  }

  return NextResponse.json({
    message: 'Your message has been sent, thank you for reaching me out',
  });
}
