import { useDispatch } from 'react-redux';

import { setIsMenuOpened } from '@/redux/slices/menu.slice';

import Navbar from '../Navbar';
import { menu } from './data';
import { LayoutProps } from './index.d';
// import Footer from '../Footer/Footer';

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch();

  const handleDrawer = (target: string) => {
    setTimeout(() => {
      document.querySelector(target)!.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 150);
  };

  return (
    <>
      <div className='drawer'>
        <input
          id='my-drawer-3'
          type='checkbox'
          className='drawer-toggle'
          onChange={() => dispatch(setIsMenuOpened())}
        />
        <div className='drawer-content flex flex-col overflow-x-hidden'>
          {/* Navbar */}
          <Navbar />
          {/* Page content here */}
          {children}
        </div>
        <div className='drawer-side'>
          <label htmlFor='my-drawer-3' className='drawer-overlay'></label>
          <ul className='menu p-4 overflow-y-auto w-4/6 bg-base-100'>
            {/* Sidebar content here */}
            {menu.map((value) => {
              return (
                <li key={value.title}>
                  <label
                    htmlFor='my-drawer-3'
                    className={`font-semibold hover:bg-blue-500 umami--click--${value.title}-section`}
                    onClick={() => handleDrawer(value.to)}
                  >
                    {value.title}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Layout;
