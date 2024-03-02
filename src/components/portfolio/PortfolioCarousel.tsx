import { ArrowUpRightFromSquareIcon, Code2Icon } from 'lucide-react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '../ui/card';
import type { SkillSet } from '@/lib/directus';

const PortfolioCarousel = ({
  portfolios,
}: {
  portfolios: {
    tech_stack: SkillSet[];
    status: string;
    date_created: Date;
    name: string;
    description: string;
    repo_url?: string | null;
    demo_url?: string | null;
    type: string;
    image: string;
  }[];
}) => {
  return (
    <Carousel className='mt-6 px-4' opts={{ slidesToScroll: 2 }}>
      <CarouselContent>
        {portfolios.map((portfolio) => (
          <CarouselItem className='basis-1/3' key={portfolio.name}>
            <Card className='group border-2 bg-gray-900 p-0 transition hover:border-teal-300'>
              <img
                src={portfolio.image}
                alt={portfolio.name}
                width={500}
                height={500}
                className='mx-auto aspect-video w-full rounded-t-md object-cover grayscale transition group-hover:grayscale-0'
                decoding='async'
                loading='lazy'
              />
              <CardContent className='space-y-2 p-6'>
                <div className='flex items-center justify-between'>
                  <h4 className='flex-wrap text-2xl font-bold'>
                    {portfolio.name}
                  </h4>
                  <div className='flex items-center space-x-2'>
                    {portfolio.repo_url && (
                      <a
                        href={portfolio.repo_url}
                        className='cursor-pointer p-2 hover:bg-gray-800'
                        title='Repository'
                        aria-label='Repo URL'
                      >
                        <Code2Icon className='h-4 w-4' />
                      </a>
                    )}
                    {portfolio.demo_url && (
                      <a
                        href={portfolio.demo_url}
                        className='cursor-pointer p-2 hover:bg-gray-800'
                        title='Demo'
                        aria-label='Demo URL'
                      >
                        <ArrowUpRightFromSquareIcon className='h-4 w-4' />
                      </a>
                    )}
                  </div>
                </div>
                <p className='text-xl'>{portfolio.description}</p>
                <div className='flex space-x-3 pt-3'>
                  {portfolio.tech_stack.map((tech) => (
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      width={25}
                      height={25}
                      className='h-6 w-auto object-contain grayscale group-hover:grayscale-0'
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='border-gray-800 bg-gray-900' />
      <CarouselNext className='border-gray-800 bg-gray-900' />
    </Carousel>
  );
};

export default PortfolioCarousel;
