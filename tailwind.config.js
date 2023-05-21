const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  black: '#282828',
  white: '#ebdbb2',
  gray: {
    50: '#fbf1c7',
    100: '#ebdbb2',
    200: '#d5c4a1',
    300: '#bdae93',
    400: '#a89985',
    500: '#928374',
    600: '#7c6f64',
    700: '#665c54',
    800: '#504945',
    900: '#3c3836',
  },
  red: {
    50: '#fb4934',
    100: '#cc241d',
    200: '#9d0006',
  },
  green: {
    50: '#b8bb26',
    100: '#98971a',
    200: '#79740e',
  },
  yellow: {
    50: '#fabd2f',
    100: '#d79921',
    200: '#af8700',
  },
  blue: {
    50: '#83a598',
    100: '#458588',
    200: '#076678',
  },
  purple: {
    50: '#d3869b',
    100: '#b16286',
    200: '#8f3f71',
  },
  orange: {
    50: '#fe8019',
    100: '#d65d0e',
    200: '#af3a03',
  },
};

const gruvboxLight = {
  ...colors,
  mode: 'light',
  bg: {
    primary: colors.gray[50],
    secondary: colors.gray[100],
    accent: colors.orange[50],
    overlay: 'rgba(45, 45, 45, 0.75)',
  },
  text: {
    primary: colors.gray[900],
    secondary: colors.gray[800],
    accent: colors.orange[900],
  },
};

const gruvboxDark = {
  ...colors,
  mode: 'dark',
  bg: {
    primary: colors.gray[900],
    secondary: colors.gray[800],
    accent: colors.orange[900],
    overlay: 'rgba(255, 255, 255, 0.75)',
  },
  text: {
    primary: colors.gray[50],
    secondary: colors.gray[100],
    accent: colors.orange[50],
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...gruvboxLight,
        dark: gruvboxDark,
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
