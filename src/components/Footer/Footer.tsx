import Link from 'next/link';

import { handleDrawer } from '@/lib/scroll-to-section/scroll-to-section';

import { menu } from '../Layout/data';
import socialMedia from '../SocialMediaIcons/data';
import Chart from './Chart';
import Money from './Money';
import Visitors from './Visitors';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className='w-screen bg-slate-800'>
      <div className='container mx-auto px-6 md:px-12 lg:px-56'>
        <div className='grid grid-cols-1 md:grid-cols-4 text-slate-200 gap-6 pt-12 pb-3'>
          <div className='space-y-4 mb-4 md:mb-0 md:col-span-2 md:mr-10 lg:mr-24'>
            <div className='space-y-1 '>
              <p className='font-bold text-3xl font-mono tracking-tight'>
                ./tfkhdyt
              </p>
              <p className='font-light text-sm text-slate-400'>
                Junior Full Stack TypeScript Developer
              </p>
            </div>
            <div className='w-full space-x-2 flex'>
              <Link href='https://saweria.co/tfkhdyt'>
                <a
                  className='relative inline-block px-4 py-4 overflow-hidden border border-green-600 group focus:outline-none focus:ring ring-green-700 w-3/6 rounded-md'
                  target='_blank'
                >
                  <span className='absolute inset-y-0 -left-2 w-[2px] transition-all bg-green-600 group-hover:w-full group-active:bg-green-500 group-hover:left-0'></span>

                  <span className='relative text-sm font-bold text-green-600 transition-colors group-hover:text-white flex justify-center items-center space-x-2'>
                    <Money />
                    <p>Donate</p>
                  </span>
                </a>
              </Link>
              <Link href='https://umami.tfkhdyt.my.id/share/lVnSHTAu/Portfolio%20Website'>
                <a
                  className='relative inline-block px-4 py-4 overflow-hidden border border-yellow-500 group focus:outline-none focus:ring ring-yellow-600 w-3/6 rounded-md'
                  target='_blank'
                >
                  <span className='absolute inset-y-0 -left-2 w-[2px] transition-all bg-yellow-500 group-hover:w-full group-active:bg-yellow-400 group-hover:left-0'></span>

                  <span className='relative text-sm font-bold text-yellow-500 transition-colors group-hover:text-white flex justify-center items-center space-x-2'>
                    <Chart />
                    <p>Analytics</p>
                  </span>
                </a>
              </Link>
            </div>
          </div>
          <div className='space-y-1'>
            <p className='font-bold text-lg underline decoration-wavy underline-offset-2 decoration-1'>
              Quick links
            </p>
            {menu.map((value) => {
              return (
                <p
                  className='text-slate-400 w-fit cursor-pointer'
                  key={value.title}
                  onClick={() => handleDrawer(value.to)}
                >
                  {value.title}
                </p>
              );
            })}
          </div>
          <div className='space-y-1'>
            <p className='font-bold text-lg underline decoration-wavy underline-offset-2 decoration-1'>
              Reach me out on
            </p>
            {socialMedia.map((value) => {
              return (
                <Link href={value.link} key={value.title}>
                  <a className='text-slate-400 block w-fit' target='_blank'>
                    {value.title}
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
        <div className='divider before:bg-slate-300/10 after:bg-slate-300/10'></div>
        <div className='mt-2 mb-6 space-y-2 md:space-y-0 flex flex-col md:flex-row md:justify-between items-center'>
          <p className='text-xs font-semibold text-slate-400'>
            © {currentYear} Taufik Hidayat • All Rights Reserved
          </p>
          <Visitors />
        </div>
      </div>
    </div>
  );
};

export default Footer;
