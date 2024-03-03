import { ArrowUpRightFromSquareIcon, Code2Icon } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
    <Carousel
      className='mt-6'
      plugins={[Autoplay()]}
      opts={{ loop: true, align: 'start' }}
    >
      <CarouselContent>
        {portfolios.map((portfolio) => (
          <CarouselItem
            className='md:basis-1/2 lg:basis-1/3'
            key={portfolio.name}
          >
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
                  <h4 className='flex-wrap font-bold md:text-xl'>
                    {portfolio.name}
                  </h4>
                  <div className='flex items-center space-x-1'>
                    {portfolio.repo_url && (
                      <a
                        href={portfolio.repo_url}
                        className='cursor-pointer rounded p-2 hover:bg-[#18202a]'
                        title='Repository'
                        aria-label='Repo URL'
                      >
                        <Code2Icon className='h-4 w-4' />
                      </a>
                    )}
                    {portfolio.demo_url && (
                      <a
                        href={portfolio.demo_url}
                        className='cursor-pointer rounded p-2 hover:bg-[#18202a]'
                        title='Demo'
                        aria-label='Demo URL'
                      >
                        <ArrowUpRightFromSquareIcon className='h-4 w-4' />
                      </a>
                    )}
                  </div>
                </div>
                <p className='text-sm md:text-lg'>{portfolio.description}</p>
                <div className='flex flex-wrap gap-3 pt-3'>
                  {portfolio.tech_stack.map((tech) => (
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      width={25}
                      height={25}
                      className='h-4 w-auto object-contain grayscale group-hover:grayscale-0 md:h-6'
                      key={tech.name}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default PortfolioCarousel;
