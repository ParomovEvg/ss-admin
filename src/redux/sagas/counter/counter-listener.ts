import { takeEvery } from 'redux-saga/effects';
import { decrement, increment, multiply } from './counter-actions';
import { doDecrement, doIncrement, doMultiply } from './counter-workers';

export function* counterListener() {
    console.log('hello2');
    yield takeEvery(increment, doIncrement);
    yield takeEvery(decrement, doDecrement);
    yield takeEvery(multiply, doMultiply);
}
