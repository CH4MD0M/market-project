import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAdminLinksNeeded: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {},
});

export const {} = layoutSlice.actions;
export default layoutSlice.reducer;
