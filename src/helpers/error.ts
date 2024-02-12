import { HTTPError, InternalServerError } from '@/domains/error/ErrorEntity';

export const handleError = (error: unknown) => {
	console.error(error);

	if (error instanceof HTTPError) throw error;
	if (error instanceof Error) throw new InternalServerError(error.message);

	throw new InternalServerError('Unknown error');
};
