import { ICardProps } from '.';

const Card = ({ title, location, time, jurusan, children }: ICardProps) => {
  return (
    <div className='card w-full bg-base-100 text-base-content shadow-xl transition-all duration-500 hover:bg-base-200'>
      <div className='card-body'>
        <h2 className='card-title -mt-2 text-lg font-black'>{title}</h2>
        <div className='space-y-2 font-medium md:-my-2 md:flex md:items-center md:space-y-0 md:space-x-2'>
          <div className='flex flex-col'>
            <p className='font-bold'>{location}</p>
            {jurusan && (
              <p className='text-sm font-light leading-tight'>{jurusan}</p>
            )}
          </div>
          <span className='block w-fit rounded bg-blue-500 px-2 py-1 font-semibold text-base-100 md:inline'>
            {time}
          </span>
        </div>
        <div className='mt-4'>{children}</div>
      </div>
    </div>
  );
};

export default Card;
