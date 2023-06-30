import '@fontsource-variable/rubik';
import './globals.css';

import ScrollToTopButton from '@/components/Buttons/ScrollToTopButton';
import Navbar from '@/components/Navbar/Navbar';
import NextAuthWrapper from '@/components/NextAuthWrapper';

import { Metadata } from 'next';
// import localFont from 'next/font/local';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';

// const rubik = localFont({
//   src: [
//     {
//       path: '../assets/fonts/rubik/Rubik-VariableFont_wght.ttf',
//       style: 'normal',
//     },
//     {
//       path: '../assets/fonts/rubik/Rubik-Italic-VariableFont_wght.ttf',
//       style: 'italic',
//     },
//   ],
//   display: 'swap',
// });

export const metadata: Metadata = {
  title: 'Taufik Hidayat - Junior Back-end Developer',
  description:
    "Hello, world! My name is Taufik Hidayat. I'm a Junior Back-end Developer, Computer Science Student, YouTuber, Free and Open Source Software Enthusiast, and GNU/Linux Nerd.",
  authors: {
    name: 'Taufik Hidayat',
  },
  creator: 'Taufik Hidayat',
  twitter: {
    creator: 'Taufik Hidayat',
    title: 'Taufik Hidayat - Junior Back-end Developer',
    description:
      "Hello, world! My name is Taufik Hidayat. I'm a Junior Back-end Developer, Computer Science Student, YouTuber, Free and Open Source Software Enthusiast, and GNU/Linux Nerd.",
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
      "Hello, world! My name is Taufik Hidayat. I'm a Junior Back-end Developer, Computer Science Student, YouTuber, Free and Open Source Software Enthusiast, and GNU/Linux Nerd.",
    title: 'Taufik Hidayat - Junior Back-end Developer',
    url: 'https://www.tfkhdyt.my.id',
    type: 'website',
  },
  metadataBase: new URL('https://tfkhdyt.my.id'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' id='html' className='dark'>
      <body className='bg-light-bg-primary text-light-fg-primary dark:bg-dark-bg-primary dark:text-dark-fg-primary'>
        <Navbar />
        <div className='relative py-6 px-8 mx-auto mt-16 md:px-16 md:mt-14 lg:container lg:px-32 xl:px-72'>
          <NextAuthWrapper>
            <NextTopLoader showSpinner={false} color='#98971a' />
            {children}
            <Toaster
              position='bottom-right'
              reverseOrder={false}
            />
          </NextAuthWrapper>
          <ScrollToTopButton />
        </div>
      </body>
    </html>
  );
}
