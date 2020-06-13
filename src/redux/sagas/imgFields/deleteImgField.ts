import { NotificationManager } from 'react-notifications';
import { Either } from 'useful-monads';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  imgFieldsActionsAsync,
  imgFieldsActions,
} from '../../slices/imgFieldsSlice';
import { TextFieldNotFoundById } from '../../../apiWorker/typings';
import { imgFieldsService } from '../../../apiWorker/servers/imgFieldService';

export function* deleteImgField(
  action: ReturnType<typeof imgFieldsActionsAsync.deleteImgfieldAsync>
) {
  yield put(imgFieldsActionsAsync.deleteImgfieldRequest(action.payload));
  try {
    const ImgFieldDeleteIdEither: Either<
      TextFieldNotFoundById,
      { id?: number | undefined }
    > = yield call(imgFieldsService.deleteimgField, action.payload);

    const imgFieldDeleteId = ImgFieldDeleteIdEither.extract();
    if (imgFieldDeleteId.right) {
      yield put(
        imgFieldsActions.deleteImgField(imgFieldDeleteId.right?.id ?? 0)
      );
    } else {
      yield put(imgFieldsActionsAsync.deleteImgfieldError(action.payload));
      NotificationManager.error(imgFieldDeleteId.left.message);
    }
  } catch (error) {
    yield put(imgFieldsActionsAsync.deleteImgfieldError(action.payload));
    if (error.response?.status ?? 0 > 499) {
      NotificationManager.error(
        'Неопознанная ошибка сервера, чип и дейл уже в пути'
      );
    }
    console.error(error);
  }
}
export function* deleteImgFieldWatcher() {
  yield takeEvery(imgFieldsActionsAsync.deleteImgfieldAsync, deleteImgField);
}
