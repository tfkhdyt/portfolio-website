/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '5rem',
        xl: '6rem',
        '2xl': '7rem',
      },
    },
    extend: {
      colors: {
        trueGray: {
          50: '#fafafa',
          100: '#f5f5f5',
        },
      },
    },
  },
  plugins: [],
};
