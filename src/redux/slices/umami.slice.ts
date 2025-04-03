import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IPageViews {
  allTime: number;
  last30Days: number;
  last24Hours: number;
}

interface InitialState {
  pageviews: IPageViews;
}

const initialState: InitialState = {
  pageviews: {
    allTime: 0,
    last30Days: 0,
    last24Hours: 0,
  },
};

export const umamiSlice = createSlice({
  name: 'umami',
  initialState,
  reducers: {
    setPageViews: (state, action: PayloadAction<IPageViews>) => {
      state.pageviews = action.payload;
    },
  },
});

export const { setPageViews } = umamiSlice.actions;
export default umamiSlice.reducer;
