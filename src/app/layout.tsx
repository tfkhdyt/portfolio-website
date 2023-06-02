import './globals.css';

import Navbar from '@/components/Navbar';
import ScrollToTopButton from '@/components/ScrollToTopButton';

import { Metadata } from 'next';
import localFont from 'next/font/local';

const rubik = localFont({
  src: [
    {
      path: '../assets/fonts/rubik/Rubik-VariableFont_wght.ttf',
      style: 'normal',
    },
    {
      path: '../assets/fonts/rubik/Rubik-Italic-VariableFont_wght.ttf',
      style: 'italic',
    },
  ],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Taufik Hidayat - Junior Back-end Developer',
  description: `Hi everyone, my name is Taufik Hidayat. I'm a Junior Back-end Developer, 
    Computer Science Student, YouTuber, Free and Open Source Software Enthusiast, and 
    GNU/Linux Nerd`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' id='html' className={rubik.className}>
      <body className='bg-light-bg-primary text-light-fg-primary dark:bg-dark-bg-primary dark:text-dark-fg-primary'>
        <Navbar />
        <div className='relative py-6 px-8 mx-auto mt-16 md:px-16 md:mt-14 lg:container lg:px-32 xl:px-72'>
          {children}
          <ScrollToTopButton />
        </div>
      </body>
    </html>
  );
}
