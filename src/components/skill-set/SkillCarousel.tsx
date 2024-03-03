import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Card, CardContent } from '../ui/card';

const SkillCarousel = ({
  skillSets,
}: {
  skillSets: {
    name: string;
    logo: string;
  }[];
}) => {
  return (
    <Carousel
      className='mt-6'
      plugins={[Autoplay()]}
      opts={{ loop: true, align: 'start' }}
    >
      <CarouselContent>
        {skillSets.map((skill) => (
          <CarouselItem
            className='basis-1/2 md:basis-1/4 lg:basis-1/6'
            key={skill.name}
          >
            <Card className='group border-2 bg-[#18202a] transition hover:border-teal-300'>
              <CardContent className='flex select-none flex-col justify-between gap-4 p-6 lg:h-[200px]'>
                <img
                  src={skill.logo}
                  alt={skill.name}
                  width={100}
                  height={100}
                  className='mx-auto h-20 object-contain grayscale transition group-hover:grayscale-0 lg:h-28'
                  decoding='async'
                  loading='lazy'
                />
                <p className='text-center font-semibold md:text-xl'>
                  {skill.name}
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default SkillCarousel;
