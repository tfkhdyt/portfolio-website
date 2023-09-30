import { ChangeEvent } from 'react';
import { match } from 'ts-pattern';

type Value = string | number | readonly string[];

type Props = {
  name: string;
  required?: boolean;
  type: 'text' | 'email' | 'url' | 'number' | 'textarea';
  placeholder?: string;
  value: Value;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};
const Input = ({
  name,
  required = false,
  type,
  placeholder,
  value,
  onChange,
}: Props) => {
  return (
    <div className='w-full'>
      <label
        htmlFor={name.replaceAll(' ', '_')}
        className='block mb-2 font-medium text-gray-900 md:flex-row dark:text-white'
      >
        {name}
        {required ? <span className='ml-1 text-red-100'>*</span> : null}
      </label>
      {match(type)
        .with('textarea', () => (
          <textarea
            id={name}
            rows={4}
            className='block p-2.5 w-full text-gray-900 bg-gray-100 rounded-lg border border-gray-300 outline-none dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-100 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-100 dark:focus:border-blue-100'
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
          ></textarea>
        ))
        .otherwise(() => (
          <input
            type={type}
            id={name.replaceAll(' ', '_')}
            className='block p-2.5 w-full text-gray-900 bg-gray-100 rounded-lg border border-gray-300 outline-none dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-100 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-100 dark:focus:border-blue-100'
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
          />
        ))}
      {/* {errors?.name && <p className='mt-2 font-medium text-red-100'>{errors.name}</p>} */}
    </div>
  );
};

export default Input;
