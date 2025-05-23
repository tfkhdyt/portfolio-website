import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	const url = new URL(request.url);

	return {
		origin: url.origin
	};
};
