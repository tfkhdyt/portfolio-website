import { useEffect, useState } from 'react';

export default function useScroll() {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const content = document.querySelector('.drawer-content') as HTMLDivElement;
    content.addEventListener('scroll', () => {
      setScrollY(content.scrollTop);
    });
  }, []);

  return scrollY;
}
