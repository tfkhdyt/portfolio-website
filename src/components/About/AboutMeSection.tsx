import Title from '../Title';

import Image from 'next/image';

const contents = [
  `Hello, world! My name is Taufik Hidayat. I'm a Junior Back-end Developer, Computer
   Science Student, YouTuber, Free and Open Source Software Enthusiast, and GNU/Linux
   Nerd. I live in Bandung, Indonesia. I was born in Majalengka on April 1, 2002 (21
   years old).`,
  `I have experience as a Junior Web Developer. I have an interest in a career as a 
   Back-end Developer (TypeScript and Golang). I’m a fast learner and self-taught. I have
   learned a lot of new technologies in the past few years by myself on the Internet.`,
];

const AboutMeSection = () => {
  return (
    <div className='flex flex-col-reverse gap-8 md:flex-row md:gap-16'>
      <div className='space-y-4 md:w-4/6'>
        <Title>About Me</Title>
        {contents.map((content) => (
          <p
            className='text-justify dark:text-gray-200 text-light-fg-secondary'
            key={content}
          >
            {content}
          </p>
        ))}
      </div>
      <div className='pt-4 md:pr-6 md:w-2/6'>
        <Image
          src='/img/tfkhdyt-real-face.jpg'
          alt='My photo'
          height={256}
          width={256}
          className='mx-auto w-64 h-auto rounded-full'
          loading='eager'
          sizes='(max-width: 768px) 256px, (max-width: 1200px) 224px, 256px'
        />
      </div>
    </div>
  );
};

export default AboutMeSection;
