import { ChangeEvent } from 'react';

type Props = {
	name: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
};
const InputImage = ({ name, onChange, required = false }: Props) => {
	return (
		<div className='w-full'>
			<label
				htmlFor={name.replaceAll(' ', '_')}
				className='block mb-2 font-medium text-gray-900 md:flex-row dark:text-white'
			>
				{name}
				{required ? <span className='ml-1 text-red-100'>*</span> : null}
			</label>

			<input
				className='block w-full text-gray-900 bg-gray-100 rounded-lg border border-gray-300 cursor-pointer outline-none dark:placeholder-gray-400 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 file:bg-gray-200 file:text-black file:border-0 file:py-2 file:px-3 dark:file:bg-dark-bg-secondary dark:file:text-white'
				id={name}
				type='file'
				accept='image/*'
				onChange={onChange}
				required={required}
			/>
			{/* {errors?.name && <p className='mt-2 font-medium text-red-100'>{errors.name}</p>} */}
		</div>
	);
};

export default InputImage;
