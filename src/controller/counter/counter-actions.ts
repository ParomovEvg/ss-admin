import { createAction } from '@reduxjs/toolkit';
const PREF = 'ui/counter/';
export const increment = createAction(PREF + 'increment');
export const decrement = createAction(PREF + 'decrement');
export const multiply = createAction<number>(PREF + 'multiply');
