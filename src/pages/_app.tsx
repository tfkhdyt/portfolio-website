import '@/styles/globals.css';

import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { store } from '@/redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </Provider>
  );
}

export default MyApp;
