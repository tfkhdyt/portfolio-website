import { Telegraf } from 'telegraf';

const BOT_TOKEN = process.env.BOT_TOKEN as string;

export const telegraf = new Telegraf(BOT_TOKEN);
