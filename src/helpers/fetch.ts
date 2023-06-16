type Params = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body: FormData;
  setIsLoading: (state: boolean) => void;
};

export function sendData({ url, method, body, setIsLoading }: Params) {
  return new Promise<string>(async (ok, err) => {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        body,
        method,
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error);

      ok(result.message);
    } catch (error) {
      err(error);
    } finally {
      setIsLoading(false);
    }
  });
}
