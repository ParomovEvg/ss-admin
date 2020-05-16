import { all } from 'redux-saga/effects';
import { counterListener } from './counter/counter-listener';
import { authFlow } from './auth/authFlow';
import { addScreen } from './screens/addScreen';
import { getScreenWatcher } from './screens/getScreen';
import { setValueWatcher } from './fields/setValue';
import { deleteFieldWatcher } from './fields/deleteField';
export function* mainSaga() {
  yield all([
    counterListener(),
    authFlow(),
    addScreen(),
    getScreenWatcher(),
    setValueWatcher(),
    deleteFieldWatcher(),
  ]);
}
