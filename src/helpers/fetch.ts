type Params = {
	url: string;
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	body: FormData | string;
	headers?: HeadersInit;
	setIsLoading: (state: boolean) => void;
};

export function sendData({ url, method, body, setIsLoading, headers }: Params) {
	return new Promise<string>((ok, err) => {
		try {
			(async () => {
				setIsLoading(true);
				const response = await fetch(url, {
					body,
					method,
					headers,
				});
				const result = await response.json();

				if (!response.ok) throw new Error(result.error);

				ok(result.message);
			})();
		} catch (error) {
			err(error);
		} finally {
			setIsLoading(false);
		}
	});
}
