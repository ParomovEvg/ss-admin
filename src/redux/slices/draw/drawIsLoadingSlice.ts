import { createSlice } from '@reduxjs/toolkit';

function drawLoading(state: boolean) {
  if (state !== true) return true;
}
function drawNoLoading(state: boolean) {
  if (state !== false) return false;
}

export const drawIsLoadingSlice = createSlice({
  name: 'draw/isLoading',
  initialState: false,
  reducers: {
    true: drawLoading,
    false: drawNoLoading,
  },
});

export const drawIsLoadingActions = {
  ...drawIsLoadingSlice.actions,
};
