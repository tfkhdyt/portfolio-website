import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
    <Carousel className='mt-6 px-4'>
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
                <p className='text-center text-lg font-semibold md:text-xl'>
                  {skill.name}
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='-left-6 border-gray-900 bg-[#18202a] lg:-left-12' />
      <CarouselNext className='-right-6 border-gray-900 bg-[#18202a] lg:-right-12' />
    </Carousel>
  );
};

export default SkillCarousel;
