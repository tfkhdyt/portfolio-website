import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useState } from 'react';

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className='rounded p-1 transition hover:bg-[#18202a]'
          aria-label='Menu'
        >
          <MenuIcon />
        </button>
      </SheetTrigger>
      <SheetContent className='w-[250px] border-gray-950 bg-gray-900 pt-12'>
        <div className='flex flex-col space-y-4  text-xl font-medium'>
          <a
            href='#home'
            className='decoration-teal-300 decoration-[3px] underline-offset-[6px] hover:underline'
            onClick={() => setOpen(false)}
          >
            Home
          </a>
          <a
            href='#about'
            className='decoration-teal-300 decoration-[3px] underline-offset-[6px] hover:underline'
            onClick={() => setOpen(false)}
          >
            About
          </a>
          <a
            href='#skill'
            className='decoration-teal-300 decoration-[3px] underline-offset-[6px] hover:underline'
            onClick={() => setOpen(false)}
          >
            Skill Set
          </a>
          <a
            href='#portfolio'
            className='decoration-teal-300 decoration-[3px] underline-offset-[6px] hover:underline'
            onClick={() => setOpen(false)}
          >
            Portfolio
          </a>
          <a
            href='#certifications'
            className='decoration-teal-300 decoration-[3px] underline-offset-[6px] hover:underline'
            onClick={() => setOpen(false)}
          >
            Certifications
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
