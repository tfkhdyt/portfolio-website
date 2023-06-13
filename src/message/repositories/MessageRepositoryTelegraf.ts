import MessageRepository from '@/domains/message/MessageRepository';
import { telegraf } from '@/lib/telegraf';
import { InternalServerError } from '@/utils/error';

import { Telegraf } from 'telegraf';

const ADMIN_ID = process.env.ADMIN_ID as string;

class MessageRepositoryTelegraf implements MessageRepository {
  constructor(private readonly telegraf: Telegraf) {}

  async sendMessage(message: string) {
    try {
      await this.telegraf.telegram.sendMessage(ADMIN_ID, message, {
        parse_mode: 'Markdown',
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
      throw new InternalServerError('Failed to send message');
    }
  }
}

export const messageRepo = new MessageRepositoryTelegraf(telegraf);
