import { Skill } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  techStack: string[];
  setTechStack: Dispatch<SetStateAction<string[]>>;
  skills: Skill[];
};

const TechPicker = ({ techStack, setTechStack, skills }: Props) => {
  return (
    <div>
      <label className='font-medium text-gray-900 md:flex-row dark:text-white'>
        Tech Stack
        <span className='ml-1 text-red-100'>*</span>
      </label>
      <fieldset className='flex flex-wrap gap-3 mt-2'>
        <legend className='sr-only'>Color</legend>

        {skills.map((skill) => (
          <div key={skill.id}>
            <input
              type='checkbox'
              name='techStack'
              value={skill.id}
              id={skill.id}
              className='peer hidden [&:checked_+_label_svg]:block transition-none'
              checked={techStack.includes(skill.id)}
              onChange={(e) => {
                const { checked, value } = e.target;

                if (checked) {
                  return setTechStack((prev) => [...prev, value]);
                }

                setTechStack((prev) => prev.filter((tech) => tech !== value));
              }}
            />

            <label
              htmlFor={skill.id}
              className='flex gap-2 justify-center items-center py-2 px-3 text-gray-900 bg-white rounded-md border border-gray-100 transition-none cursor-pointer hover:border-gray-200 peer-checked:border-blue-100 peer-checked:bg-blue-100 peer-checked:text-white'
            >
              <svg
                className='hidden w-5 h-5 transition-none'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clipRule='evenodd'
                />
              </svg>

              <p className='text-sm font-medium transition-none'>{skill.name}</p>
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
};

export default TechPicker;
