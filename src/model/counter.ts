import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const counter = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
        setCounter: (state, action: PayloadAction<number>) => action.payload,
        multiply: {
            reducer: (state, action: PayloadAction<number>) =>
                state * action.payload,
            prepare: (value: number) => ({ payload: value || 2 }), // fallback if the payload is a falsy value
        },
    },
});
const counterActions = counter.actions;
export { counter, counterActions };
