import Avatar from '@/components/Home/Avatar';
import DownloadResumeButton from '@/components/Home/DownloadResumeButton';
import TypewritedDesc from '@/components/Home/TypewritedDesc';

export default async function Home() {
  return (
    <main className='flex flex-col-reverse gap-4 items-center md:flex-row md:gap-8 md:justify-around min-h-[65vh] md:min-h-[80vh]'>
      <div className='space-y-2 text-center md:text-left'>
        <h1 className='text-4xl font-bold md:text-5xl'>Taufik Hidayat</h1>
        <TypewritedDesc />
        <p className='pb-2 md:text-lg'>
          Hi everyone <span className='wave'>👋🏼</span>, welcome to my portfolio website.
        </p>
        <DownloadResumeButton />
      </div>
      <Avatar />
    </main>
  );
}
