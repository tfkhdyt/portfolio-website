import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useEffect, useState } from 'react';
import { navigations } from '@/constants/sections';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('#home');

  useEffect(() => {
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
      for (const section of sections) {
        if (window.scrollY >= section.offsetTop - section.clientHeight / 8) {
          setCurrentSection('#' + section.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
        <div className='flex flex-col space-y-2 text-lg font-medium'>
          {navigations.map((nav) => (
            <a
              href={nav.to}
              className={cn(
                'nav-item w-fit decoration-teal-300 decoration-[3px] underline-offset-[6px] hover:underline',
                currentSection === nav.to && 'active',
              )}
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
