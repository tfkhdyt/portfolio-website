const Preview = () => {
  const mode = {
    dev: 'http://localhost:3000',
    prod: 'https://aljabar-linier-matriks-kelompok-2.vercel.app/',
  };
  return (
    <iframe
      src={mode.dev}
      // src={mode.prod}
      frameBorder='0'
      width='1366'
      height='768'
    ></iframe>
  );
};

export default Preview;
