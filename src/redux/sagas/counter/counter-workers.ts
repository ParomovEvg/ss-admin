import { call, put } from 'redux-saga/effects';
import { multiply } from './counter-actions';
import { getState } from '../../createStore';
import { counterActions } from '../../counter';

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function* doIncrement() {
  const { counter } = getState();
  yield call(delay, 1000);
  console.log('increment');
  yield put(counterActions.setCounter(counter + 1));
}

export function* doDecrement() {
  const { counter } = getState();
  yield call(delay, 1000);
  console.log('decrement');
  yield put(counterActions.setCounter(counter - 1));
}

export function* doMultiply(action: ReturnType<typeof multiply>) {
  yield call(delay, 1000);
  console.log('multiply');
  yield put(counterActions.multiply(action.payload));
}
