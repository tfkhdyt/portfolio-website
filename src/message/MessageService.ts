import { UnauthenticatedError } from '@/domains/error/ErrorEntity';
import { SendMessageRequest } from '@/domains/message/MessageDto';
import MessageRepository from '@/domains/message/MessageRepository';
import { handleError } from '@/helpers/error';
import { messageRepo } from './repositories/MessageRepositoryTelegraf';

const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY as string;

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

  async verifyCaptchaToken(token: string) {
    try {
      const res = await fetch(verifyEndpoint, {
        method: 'POST',
        body: `secret=${encodeURIComponent(TURNSTILE_SECRET_KEY)}&response=${encodeURIComponent(token)}`,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      });

      const data = await res.json();

      if (!data.success || !res.ok) {
        throw new UnauthenticatedError('Your captcha token is not valid');
      }
    } catch (error) {
      throw handleError(error);
    }
  }
}

export const messageService = new MessageService(messageRepo);
