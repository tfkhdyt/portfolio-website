import TypewritedDesc from '@/components/Home/TypewritedDesc';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex gap-8 justify-around items-center min-h-[75vh]'>
      <div className='space-y-2'>
        <h1 className='text-5xl font-bold'>Taufik Hidayat</h1>
        <TypewritedDesc />
        <p className='pb-2 text-lg'>
          Hi everyone <span className='wave'>👋🏼</span>, welcome to my portfolio website.
        </p>
        <a
          href='/documents/resume.pdf'
          target='_blank'
          className='flex items-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-300 dark:text-white dark:bg-gray-800 dark:border-gray-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none w-fit dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='mr-2 w-4 h-4'>
            <path
              fillRule='evenodd'
              d='M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm5.845 17.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V12a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z'
              clipRule='evenodd'
            />
            <path d='M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z' />
          </svg>

          Download Resume
        </a>
      </div>
      <div>
        <Image src='/img/tfkhdyt-avatar.svg' alt='tfkhdyt avatar' width={300} height={300} />
      </div>
    </main>
  );
}
