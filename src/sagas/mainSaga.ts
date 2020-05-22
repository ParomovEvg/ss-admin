import { all } from 'redux-saga/effects';
import { counterListener } from './counter/counter-listener';
import { authFlow } from './auth/authFlow';
import { addScreen } from './screens/addScreen';
import { getScreenWatcher } from './screens/getScreen';
import { addValueWatcher } from './textFields/addTextValue';
import { deleteTextFieldWatcher } from './textFields/deleteTextField';
import { addTextFieldWatcher } from './textFields/addTextField';
import { deleteImgFieldWatcher } from './imgFields/deleteImgField';
import { addImgFieldWatcher } from './imgFields/addImgField';
import { getAllCheckout } from './checkouts/getAllCheckout';
import { deleteCheckoutWatcher } from './checkouts/deleteCheckout';
import { addCheckout } from './checkouts/addCheckout';
export function* mainSaga() {
  yield all([
    counterListener(),
    authFlow(),
    addScreen(),
    getScreenWatcher(),
    addValueWatcher(),
    deleteTextFieldWatcher(),
    deleteImgFieldWatcher(),
    addImgFieldWatcher(),
    addTextFieldWatcher(),
    getAllCheckout(),
    deleteCheckoutWatcher(),
    addCheckout(),
  ]);
}
