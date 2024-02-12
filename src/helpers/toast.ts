import { Renderable, ValueOrFunction, toast } from 'react-hot-toast';

export function toastPromise<T>(
	promise: Promise<T>,
	onSuccess: ValueOrFunction<Renderable, T>,
	isDarkMode: boolean,
) {
	toast.promise(
		promise,
		{
			loading: 'Loading',
			success: onSuccess,
			error: (err) => {
				if (err instanceof Error) {
					console.error(err);
					return err.message;
				}

				return 'Error!';
			},
		},
		{
			duration: 5000,
			style: {
				background: isDarkMode ? '#2e2e2e' : '#ebdbb2',
				color: isDarkMode ? '#ebdbb2' : '#2e2e2e',
			},
		},
	);
}
