import MessageRepository from '@/domains/message/MessageRepository';
import { handleError } from '@/helpers/error';
import { telegraf } from '@/lib/telegraf';

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
			throw handleError(error);
		}
	}
}

export const messageRepo = new MessageRepositoryTelegraf(telegraf);
