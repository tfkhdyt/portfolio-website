import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Chart } from 'react-chartjs-2';

import { variants } from '@/animations/variants';

import Card from './Card';
import {
  chartKuliahOptions,
  chartSMKOptions,
  ips,
  nilaiSemester,
} from './data';

ChartJS.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
ChartJS.defaults.color = '#708090';

const Resume = () => {
  const chartKuliahref = useRef<ChartJS>(null);
  const chartSMKref = useRef<ChartJS>(null);
  const [kuliahDataSets, setKuliahDataSets] = useState({});
  const [SMKDataSets, setSMKDataSets] = useState({});

  useEffect(() => {
    const chart = chartKuliahref.current;
    if (chart) {
      setKuliahDataSets({
        backgroundColor: createGradient(chart.ctx),
        // color: '#708090',
        fill: true,
        tension: 0.4,
      });
    }

    const chartSMK = chartSMKref.current;
    if (chartSMK) {
      setSMKDataSets({
        backgroundColor: createGradient(chartSMK.ctx),
        // color: '#708090',
        // color: getComputedStyle(document.documentElement).getPropertyValue('text-base-content'),
        fill: true,
        tension: 0.4,
      });
    }
  }, []);

  const createSemesterArray = (numberOfSemester: number) => {
    const array: string[] = [];
    for (let index = 1; index <= numberOfSemester; index++) {
      array.push(String(index));
    }
    return array;
  };

  const createGradient = (ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 150);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 1)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    return gradient;
  };

  return (
    <div className='w-screen'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
        className='fill-blue-500'
      >
        <path d='M0,32L48,42.7C96,53,192,75,288,101.3C384,128,480,160,576,165.3C672,171,768,149,864,122.7C960,96,1056,64,1152,48C1248,32,1344,32,1392,32L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></path>
      </svg>
      {/* content */}
      <div
        className='-my-px scroll-mt-24 bg-blue-500 text-base-100'
        id='resume'
      >
        <div className='container mx-auto space-y-8 px-6 md:px-12 lg:px-56'>
          {/* title */}
          <motion.div
            variants={variants}
            initial='fromBottom'
            whileInView='toTop'
            viewport={{ once: true }}
            className='flex w-full justify-center text-3xl font-black'
          >
            Resume
          </motion.div>
          <div className='grid grid-cols-1 gap-8'>
            <motion.div
              variants={variants}
              initial='fromBottom'
              whileInView='toTop'
              viewport={{ once: true }}
            >
              <h1 className='mb-4 text-2xl font-bold text-base-100'>
                Work Experience
              </h1>
              <Card
                title='Internship'
                location='PT. Inovindo Digital Media'
                time='Jan 2019 - Mar 2019'
              >
                <ul className='ml-6 list-disc font-light'>
                  <li>Developed an e-commerce website for resellers</li>
                  <li>
                    Deployed websites that have been finished by the team to web
                    hosting service
                  </li>
                  <li>Managed a company product list database</li>
                  <li>Published articles for client’s company blog</li>
                  <li>Improved client’s website Seach Engine Optimization</li>
                </ul>
              </Card>
            </motion.div>
            <motion.div
              variants={variants}
              initial='fromBottom'
              whileInView='toTop'
              viewport={{ once: true }}
            >
              <h1 className='mb-4 text-2xl font-bold text-base-100'>
                Education
              </h1>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <Card
                  title='Vocational High School'
                  location='SMKN 7 Baleendah'
                  jurusan='Software Engineering'
                  time='2017 - 2020'
                >
                  <div className='min-h-[200px] text-base-content'>
                    <Chart
                      type='line'
                      ref={chartSMKref}
                      data={{
                        labels: ['1', '2', '3', '4', '5', '6'],
                        datasets: [
                          {
                            ...SMKDataSets,
                            label: 'Grade Point',
                            data: nilaiSemester,
                            pointHitRadius: 10,
                          },
                        ],
                      }}
                      options={chartSMKOptions}
                    />
                  </div>
                </Card>
                <Card
                  title='University'
                  location='Universitas Bale Bandung'
                  jurusan='Computer Science'
                  time='2020 - Now'
                >
                  <div className='min-h-[200px] text-base-content'>
                    <Chart
                      type='line'
                      ref={chartKuliahref}
                      data={{
                        labels: createSemesterArray(ips.length),
                        datasets: [
                          {
                            ...kuliahDataSets,
                            label: 'Grade Point',
                            data: ips,
                            pointHitRadius: 10,
                          },
                        ],
                      }}
                      options={chartKuliahOptions}
                    />
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* ======== */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
        className='fill-blue-500'
      >
        <path d='M0,224L48,218.7C96,213,192,203,288,192C384,181,480,171,576,165.3C672,160,768,160,864,165.3C960,171,1056,181,1152,176C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'></path>
      </svg>
    </div>
  );
};

export default Resume;
