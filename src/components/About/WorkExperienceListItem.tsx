import { WorkExperience } from './WorkExperienceSection';

import clsx from 'clsx';

type Props = {
  idx: number;
  contentsLength: number;
  content: WorkExperience;
};

const WorkExperienceListItem = ({ idx, contentsLength, content }: Props) => {
  return (
    <li className={clsx('ml-6', idx !== (contentsLength - 1) && 'mb-10')}>
      <span className='flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-500 rounded-full ring-8 dark:bg-green-100 ring-light-bg-primary dark:ring-dark-bg-primary'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-3 h-3'
        >
          <path
            fillRule='evenodd'
            d='M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z'
            clipRule='evenodd'
          />
          <path d='M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z' />
        </svg>
      </span>
      <h1 className='flex items-center mb-1 text-lg font-semibold text-light-fg-primary dark:text-dark-fg-primary'>
        {content.company}
      </h1>
      <p className='block mb-3 italic font-normal leading-none text-light-fg-secondary dark:text-dark-fg-secondary/75'>
        {content.role}
      </p>
      <time className='block mb-3 text-sm font-normal leading-none text-light-fg-secondary dark:text-dark-fg-secondary/75'>
        {content.period}
      </time>
      <div className='mb-4 ml-4 text-base font-normal dark:text-gray-200 text-light-fg-secondary'>
        <ul className='space-y-1 list-disc list-outside'>
          {content.jobList.map((task) => (
            <li key={task}>
              {task}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default WorkExperienceListItem;
