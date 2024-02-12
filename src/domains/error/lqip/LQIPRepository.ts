export default interface LQIPRepository {
	getLQIP(image: File): Promise<string>;
}
