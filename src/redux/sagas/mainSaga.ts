import { all } from 'redux-saga/effects';

import { counterListener } from './counter/counter-listener';
import { authFlow } from './auth/authFlow';
import { addScreenWatcher } from './screens/addScreen';
import { getScreenWatcher } from './screens/getScreen';
import { addValueWatcher } from './textFields/addTextValue';
import { deleteTextFieldWatcher } from './textFields/deleteTextField';
import { addTextFieldWatcher } from './textFields/addTextField';
import { deleteImgFieldWatcher } from './imgFields/deleteImgField';
import { addImgFieldWatcher } from './imgFields/addImgField';
import { getAllCheckout } from './checkouts/getAllCheckout';
import { deleteCheckoutWatcher } from './checkouts/deleteCheckout';
import { addCheckout } from './checkouts/addCheckout';
import { addImgWatcher } from './imgFields/addImg';
import { addTheSameImgWatcher } from './imgFields/addTheSameImg';
import { deleteMarkdownWatcher } from './markdownField/deleteMarkdown';
import { addMarkdownValueWatcher } from './markdownField/addMarkdownValue';
import { addMarkdownFieldWatcher } from './markdownField/addMarkdownField';
import { renameScreenWatcher } from './screens/renameScreen';
import { deleteScreenWatcher } from './screens/deleteScreen';
import { addDrawWather } from './draw/addDraw';
import { getAllDrawWatcher } from './draw/getAllDraw';
import { getNowDrawWatcher } from './draw/getNowDraw';
import { deleteDrawWather } from './draw/deleteDraw';
import { updateDrawWather } from './draw/updateDraw';
import { nextDrawWather } from './draw/nextDraw';
import { updateImgFieldWatcher } from './imgFields/updateImgField';
import { updateTextFieldWatcher } from './textFields/updateTextField';
import { changePhoneWatcher } from './qr/changePhone';
import { filterQrWatcher } from './qr/filterQr';
export function* mainSaga() {
  yield all([
    counterListener(),
    authFlow(),
    getScreenWatcher(),
    addValueWatcher(),
    deleteTextFieldWatcher(),
    deleteImgFieldWatcher(),
    addImgFieldWatcher(),
    addTextFieldWatcher(),
    getAllCheckout(),
    deleteCheckoutWatcher(),
    addCheckout(),
    addImgWatcher(),
    addTheSameImgWatcher(),
    deleteMarkdownWatcher(),
    addMarkdownValueWatcher(),
    addMarkdownFieldWatcher(),
    renameScreenWatcher(),
    addScreenWatcher(),
    deleteScreenWatcher(),
    addDrawWather(),
    getAllDrawWatcher(),
    getNowDrawWatcher(),
    deleteDrawWather(),
    updateDrawWather(),
    nextDrawWather(),
    updateImgFieldWatcher(),
    updateTextFieldWatcher(),
    changePhoneWatcher(),
    filterQrWatcher(),
  ]);
}
