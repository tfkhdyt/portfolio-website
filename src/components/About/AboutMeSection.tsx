import Image from 'next/image';
import Title from '../Title';

const AboutMeSection = () => (
  <div className='flex gap-16'>
    <div className='space-y-4 w-4/6'>
      <Title>About Me</Title>
      <p className='text-justify text-light-fg-secondary dark:text-dark-fg-secondary'>
        Hello, world! My name is Taufik Hidayat. I&apos;m a Junior Back-end Developer, Computer Science Student,
        YouTuber, Free and Open Source Software Enthusiast, and GNU/Linux Nerd. I live in Bandung, Indonesia. I was born
        in Majalengka, 1 April 2002 (21 years old).
      </p>
      <p className='text-justify text-light-fg-secondary dark:text-dark-fg-secondary'>
        I&apos;ve gained some valuable experience in this field, particularly in web development. I am deeply passionate
        about pursuing a career as a Back-end Developer, with a strong focus on specializing in TypeScript and Golang.
        I’m also a fast learner and self-taught. Over the past few years, I have acquired knowledge in numerous new
        technologies by actively exploring the vast resources available on the internet.
      </p>
    </div>
    <div className='pt-4 pr-6 w-2/6'>
      <Image
        src='/img/tfkhdyt-real-face.jpg'
        alt='My photo'
        height={1000}
        width={1000}
        className='mx-auto rounded-full'
      />
    </div>
  </div>
);

export default AboutMeSection;
