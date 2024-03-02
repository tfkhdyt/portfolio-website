import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useState } from 'react';

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className='rounded p-1 transition hover:bg-[#18202a]'>
          <MenuIcon />
        </button>
      </SheetTrigger>
      <SheetContent className='flex flex-col gap-6 border-gray-950 bg-gray-900 pt-12 text-xl font-semibold'>
        <a href='#home' onClick={() => setOpen(false)}>
          Home
        </a>
        <a href='#about' onClick={() => setOpen(false)}>
          About
        </a>
        <a href='#skill' onClick={() => setOpen(false)}>
          Skill Set
        </a>
        <a href='#portfolio' onClick={() => setOpen(false)}>
          Portfolio
        </a>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
