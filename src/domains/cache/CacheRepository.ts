export default interface CacheRepository {
  set(key: string, value: string): Promise<void>;
  get<T>(key: string): Promise<T>;
  delete(key: string): Promise<void>;
}
