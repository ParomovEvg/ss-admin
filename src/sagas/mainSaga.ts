import { all } from 'redux-saga/effects';
import { counterListener } from './counter/counter-listener';
import { authFlow } from './auth/authFlow';
import { addScreen } from './screens/addScreen';
import { getScreenWatcher } from './screens/getScreen';
import { addValueWatcher } from './fields/addValue';
import { deleteFieldWatcher } from './fields/deleteField';
import { addFieldWatcher } from './fields/addField';
export function* mainSaga() {
  yield all([
    counterListener(),
    authFlow(),
    addScreen(),
    getScreenWatcher(),
    addValueWatcher(),
    deleteFieldWatcher(),
    addFieldWatcher(),
  ]);
}
