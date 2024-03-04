import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useState } from 'react';
import { navigations } from '@/constants/sections';

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className='relative z-50 rounded p-1 transition hover:bg-[#18202a]'
          aria-label='Menu'
        >
          <MenuIcon />
        </button>
      </SheetTrigger>
      <SheetContent className='w-[250px] border-gray-950 bg-gray-900 pt-12'>
        <div className='flex flex-col space-y-4  text-xl font-medium'>
          {navigations.map((nav) => (
            <a
              href={nav.to}
              className='w-fit decoration-teal-300 decoration-[3px] underline-offset-[6px] hover:underline'
              onClick={() => setOpen(false)}
              key={nav.name}
            >
              {nav.name}
            </a>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
