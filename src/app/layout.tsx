import './globals.css';

import Navbar from '@/components/Navbar';
import ScrollToTopButton from '@/components/ScrollToTopButton';

import clsx from 'clsx';
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
  description:
    `Hi everyone, my name is Taufik Hidayat. I'm a Junior Back-end Developer, Computer Science Student, YouTuber, Free and Open Source Software Enthusiast, and GNU/Linux Nerd`,
  authors: {
    name: 'Taufik Hidayat',
  },
  creator: 'Taufik Hidayat',
  twitter: {
    creator: 'Taufik Hidayat',
    title: 'Taufik Hidayat - Junior Back-end Developer',
    description:
      `Hi everyone, my name is Taufik Hidayat. I'm a Junior Back-end Developer, Computer Science Student, YouTuber, Free and Open Source Software Enthusiast, and GNU/Linux Nerd`,
    card: 'summary',
    site: 'https://www.tfkhdyt.my.id',
  },
  keywords: [
    'Taufik Hidayat',
    'tfkhdyt',
    'Back-end Developer',
    'Back-end',
    'Developer',
    'Programmer',
    'Full Stack',
  ],
  openGraph: {
    description:
      `Hi everyone, my name is Taufik Hidayat. I'm a Junior Back-end Developer, Computer Science Student, YouTuber, Free and Open Source Software Enthusiast, and GNU/Linux Nerd`,
    title: 'Taufik Hidayat - Junior Back-end Developer',
    url: 'https://www.tfkhdyt.my.id',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' id='html' className={clsx(rubik.className, 'dark')}>
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
