import { redis } from '@/lib/redis';
import { InternalServerError } from './error';

const NODE_ENV = process.env.NODE_ENV;

export const setCache = async (key: string, value: string) => {
  try {
    await redis.set(`${key}-${NODE_ENV}`, value, { ex: 86400 });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) throw new InternalServerError(error.message);
    throw new InternalServerError(`Failed to set ${key} data to cache`);
  }
};

export const getCache = async <T>(key: string) => {
  try {
    const value = await redis.get<T>(`${key}-${NODE_ENV}`);
    return value;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) throw new InternalServerError(error.message);
    throw new InternalServerError(`Failed to get ${key} data from cache`);
  }
};

export const deleteCache = async (key: string) => {
  try {
    await redis.del(`${key}-${NODE_ENV}`);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) throw new InternalServerError(error.message);
    throw new InternalServerError(`Failed to delete ${key} data from cache`);
  }
};
