export default interface CacheRepository {
  set(key: string, value: string): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  delete(key: string): Promise<void>;
}
