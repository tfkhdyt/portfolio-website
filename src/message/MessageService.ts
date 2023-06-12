import { SendMessageRequest } from '@/domains/message/MessageDto';
import MessageRepository from '@/domains/message/MessageRepository';
import { telegraf } from '@/lib/telegraf';
import MessageRepositoryTelegraf from './repositories/MessageRepositoryTelegraf';

class MessageService {
  constructor(private readonly messageRepo: MessageRepository) {}

  async sendMessage(payload: SendMessageRequest) {
    const messageTemplate = `*${payload.name} (${payload.email}) says:*
${payload.message}`;

    await this.messageRepo.sendMessage(messageTemplate);

    return {
      message: 'Your message has been sent, thank you for reaching me out.',
    };
  }
}

const messageRepo = new MessageRepositoryTelegraf(telegraf);

export const messageService = new MessageService(messageRepo);
