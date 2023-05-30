import Navbar from '@/components/Navbar';
import './globals.css';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import { Metadata } from 'next';
import localFont from 'next/font/local';

const rubik = localFont({
  src: [
    {
      path: '../../public/fonts/rubik/Rubik-VariableFont_wght.ttf',
      style: 'normal',
    },
    {
      path: '../../public/fonts/rubik/Rubik-Italic-VariableFont_wght.ttf',
      style: 'italic',
    },
  ],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Taufik Hidayat - Junior Back-end Developer',
  description:
    "Hi everyone, my name is Taufik Hidayat. I'm a Junior Back-end Developer, Computer Science Student, YouTuber, Free and Open Source Software Enthusiast, and GNU/Linux Nerd",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' id='html' className={rubik.className}>
      <body className='bg-light-bg-primary text-light-fg-primary dark:bg-dark-bg-primary dark:text-dark-fg-primary'>
        <>
          <Navbar />
          <PageTransitionWrapper>
            {children}
          </PageTransitionWrapper>
        </>
      </body>
    </html>
  );
}
