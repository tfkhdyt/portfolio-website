/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
// const withPWA = require('next-pwa');
// require('dotenv').config()

// module.exports = withPWA({
//   reactStrictMode: true,
//   compiler: {
//     removeConsole: {
//       exclude: ['error'],
//     },
//   },
//   swcMinify: true,
//   pwa: {
//     dest: 'public',
//     disable: process.env.NODE_ENV === 'development',
//   },
// });

module.exports = {
  reactStrictMode: true,
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
  swcMinify: true,
};
