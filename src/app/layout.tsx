import Navbar from '@/components/Navbar'
import './globals.css'
import { Rubik } from 'next/font/google'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'Taufik Hidayat - Junior Back-end Developer',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-bg-primary dark:bg-dark-bg-primary'>
      <body className={rubik.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
