import CacheRepository from '@/domains/cache/CacheRepository';
import { handleError } from '@/helpers/error';
import { redis } from '@/lib/redis';

import { Redis } from '@upstash/redis';

const NODE_ENV = process.env.NODE_ENV;

class CacheRepositoryRedis implements CacheRepository {
	constructor(private readonly redis: Redis) {}

	async set(key: string, value: string) {
		try {
			await this.redis.set(`${key}-${NODE_ENV}`, value, { ex: 86400 });
		} catch (error) {
			throw handleError(error);
		}
	}

	async get<T>(key: string): Promise<T | null> {
		try {
			const value = await this.redis.get(`${key}-${NODE_ENV}`);
			if (!value) {
				return null;
			}

			return value as T;
		} catch (error) {
			throw handleError(error);
		}
	}

	async delete(key: string): Promise<void> {
		try {
			await this.redis.del(`${key}-${NODE_ENV}`);
		} catch (error) {
			throw handleError(error);
		}
	}
}

export const cacheRepo = new CacheRepositoryRedis(redis);
