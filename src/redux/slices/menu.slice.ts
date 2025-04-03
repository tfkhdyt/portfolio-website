import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  isMenuOpened: boolean;
}

const initialState: InitialState = {
  isMenuOpened: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setIsMenuOpened: (state) => {
      state.isMenuOpened = !state.isMenuOpened;
    },
  },
});

export const { setIsMenuOpened } = menuSlice.actions;
export default menuSlice.reducer;
