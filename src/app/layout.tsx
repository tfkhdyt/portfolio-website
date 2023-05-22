import Navbar from '@/components/Navbar';
import './globals.css';
import { Metadata } from 'next';
import { Rubik } from 'next/font/google';

const rubik = Rubik({ subsets: ['latin'] });

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
      <body className='transition duration-300 bg-light-bg-primary text-light-fg-primary dark:bg-dark-bg-primary dark:text-dark-fg-primary'>
        <>
          <Navbar />
          <main className='container py-6 mx-auto md:px-32 lg:px-72'>
            {children}
          </main>
        </>
      </body>
    </html>
  );
}
