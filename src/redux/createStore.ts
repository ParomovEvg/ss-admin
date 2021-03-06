import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { state } from './state';
import createSagaMiddleware from 'redux-saga';
import { Selector } from '@reduxjs/toolkit';
import { mainSaga } from './sagas/mainSaga';
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: state,
  middleware: [
    sagaMiddleware,
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});
sagaMiddleware.run(mainSaga);

export type RootState = ReturnType<typeof state>;
export type AppDispatch = typeof store.dispatch;
export type RootSelector<T> = Selector<RootState, T>;
export const getState = store.getState;
