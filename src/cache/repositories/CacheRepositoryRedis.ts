import CacheRepository from '@/domains/cache/CacheRepository';
import { InternalServerError } from '@/domains/error/ErrorEntity';
import { redis } from '@/lib/redis';

import { Redis } from '@upstash/redis';

const NODE_ENV = process.env.NODE_ENV;

class CacheRepositoryRedis implements CacheRepository {
  constructor(private readonly redis: Redis) {}

  async set(key: string, value: string) {
    try {
      await this.redis.set(`${key}-${NODE_ENV}`, value, { ex: 86400 });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) throw new InternalServerError(error.message);
      throw new InternalServerError(`Failed to set ${key} data to cache`);
    }
  }

  async get<T>(key: string): Promise<T> {
    try {
      const value = await this.redis.get(`${key}-${NODE_ENV}`);
      return value as T;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) throw new InternalServerError(error.message);
      throw new InternalServerError(`Failed to get ${key} data from cache`);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.redis.del(`${key}-${NODE_ENV}`);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) throw new InternalServerError(error.message);
      throw new InternalServerError(`Failed to delete ${key} data from cache`);
    }
  }
}

export const cacheRepo = new CacheRepositoryRedis(redis);
