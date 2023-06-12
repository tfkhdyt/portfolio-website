export default interface MessageRepository {
  sendMessage(message: string): Promise<void>;
}
