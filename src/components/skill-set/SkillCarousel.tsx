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
    <Carousel className='mt-6 px-4' opts={{ slidesToScroll: 6 }}>
      <CarouselContent>
        {skillSets.map((skill) => (
          <CarouselItem className='basis-1/6' key={skill.name}>
            <Card className='group w-fit border-2 bg-gray-800 transition hover:border-teal-300'>
              <CardContent className='flex aspect-square h-[200px] flex-col justify-between p-6'>
                <img
                  src={skill.logo}
                  alt={skill.name}
                  width={100}
                  height={100}
                  className='mx-auto h-28 object-contain grayscale transition group-hover:grayscale-0'
                  decoding='async'
                  loading='lazy'
                />
                <p className='text-center text-xl font-semibold'>
                  {skill.name}
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='border-gray-900 bg-gray-800' />
      <CarouselNext className='border-gray-900 bg-gray-800' />
    </Carousel>
  );
};

export default SkillCarousel;
