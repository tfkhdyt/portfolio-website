export const handleDrawer = (target: string) => {
  setTimeout(() => {
    document.querySelector(target)!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, 150);
};
