import { ProjectCategory, SkillCategory } from '@prisma/client';
import { ChangeEvent } from 'react';

type Value = string | number | readonly string[];

type Props = {
  value: Value;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  categories: (SkillCategory | ProjectCategory)[];
};
const CategoryPicker = ({ value, onChange, categories }: Props) => {
  return (
    <div className='w-full'>
      <label
        htmlFor='category'
        className='block mb-2 font-medium text-gray-900 md:flex-row dark:text-white'
      >
        Category
        <span className='ml-1 text-red-100'>*</span>
      </label>
      <select
        id='category'
        className='block p-2.5 w-32 w-full text-gray-900 bg-gray-100 rounded-lg border border-gray-300 outline-none dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-100 focus:ring-blue-100 dark:focus:ring-blue-100 dark:focus:border-blue-100'
        value={value}
        onChange={onChange}
        required
      >
        {categories.map((category) => (
          <option
            value={category.id}
            key={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
      {/* {errors?.name && <p className='mt-2 font-medium text-red-100'>{errors.name}</p>} */}
    </div>
  );
};

export default CategoryPicker;
