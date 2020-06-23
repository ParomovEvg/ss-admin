import { createSlice } from '@reduxjs/toolkit';

export const IsLoadingSliceConstructor = (name: string) => {
  function loading(state: boolean) {
    if (state !== true) return true;
  }
  function noLoading(state: boolean) {
    if (state !== false) return false;
  }

  const isLoadingSlice = createSlice({
    name,
    initialState: false,
    reducers: {
      true: loading,
      false: noLoading,
    },
  });

  const actions = {
    ...isLoadingSlice.actions,
  };

  return {
    reducer: isLoadingSlice.reducer,
    actions,
  };
};
