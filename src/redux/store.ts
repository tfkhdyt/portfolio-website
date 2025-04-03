import { configureStore } from '@reduxjs/toolkit';

import menuReducer from './slices/menu.slice';
import umamiReducer from './slices/umami.slice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    umami: umamiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
