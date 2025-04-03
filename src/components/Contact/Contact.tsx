import { motion } from 'framer-motion';

import { variants } from '@/animations/variants';

import ContactSection from './ContactSection';
import { contacts } from './data';
import Form from './Form';

// import { ips, chartKuliahOptions, chartSMKOptions, nilaiSemester } from './data'

// const Card = dynamic(() => import('./Card'))

const Contact = () => {
  return (
    <div className='w-screen'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
        className='fill-blue-500'
      >
        <path d='M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,90.7C672,107,768,149,864,176C960,203,1056,213,1152,192C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></path>
      </svg>
      {/* content */}
      <div
        className='-my-px scroll-mt-20 bg-blue-500 py-5 text-base-100 md:scroll-mt-24 md:py-0 md:pb-32'
        id='contact'
      >
        <div className='container mx-auto space-y-8 px-6 pb-12 md:px-12 lg:px-56'>
          {/* title */}
          <motion.div
            variants={variants}
            initial='fromBottom'
            whileInView='toTop'
            viewport={{ once: true }}
            className='flex w-full justify-center text-3xl font-black'
          >
            Contact
          </motion.div>
          <div className='flex flex-col items-start space-y-6 md:flex-row md:space-y-0 md:space-x-6'>
            {/* info contact */}
            <div className='flex w-full flex-col space-y-6 md:w-5/12'>
              {contacts.map((value) => (
                <div key={value.title}>
                  <ContactSection {...value} />
                </div>
              ))}
            </div>
            {/* end of info contact */}
            <div className='divider before:bg-base-300/20 after:bg-base-300/20 md:divider-horizontal'></div>
            <Form />
          </div>
        </div>
      </div>
      {/* ======== */}
    </div>
  );
};

export default Contact;
