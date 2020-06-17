import { imgFieldsService } from './../../../apiWorker/servers/imgFieldService';
import { NotificationManager } from 'react-notifications';
import { Either } from 'useful-monads';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import {
  imgFieldsActionsAsync,
  imgFieldsActions,
  updateImgFieldidSelector,
} from '../../slices/imgFieldsSlice';
import { ImgFieldNotFoundById, ImgFieldDto } from '../../../apiWorker/typings';

export function* updateImgField(
  action: ReturnType<typeof imgFieldsActionsAsync.updateImgField_async>
) {
  const { values, action: formikActions } = action.payload;
  const id = yield select(updateImgFieldidSelector);
  yield put(imgFieldsActions.isLoadingField(id));
  try {
    const updateImgFieldEither: Either<
      ImgFieldNotFoundById,
      ImgFieldDto
    > = yield call(imgFieldsService.updateImgField, id, values);

    const updateImgField = updateImgFieldEither.extract();
    if (updateImgField.right) {
      const imgFieldEither: Either<
        ImgFieldNotFoundById,
        ImgFieldDto
      > = yield call(imgFieldsService.getImgField, id);
      const imgField = imgFieldEither.extract();

      if (imgField.right) {
        formikActions.resetForm();
        yield put(
          imgFieldsActions.updateImgField({
            ...imgField.right,
            isLoading: false,
          })
        );
      } else {
        yield put(imgFieldsActions.isLoadingField(id));
        NotificationManager.error(imgField.left.message);
      }
    } else {
      yield put(imgFieldsActions.isLoadingField(id));
      NotificationManager.error(updateImgField.left.message);
    }
  } catch (error) {
    yield put(imgFieldsActions.isLoadingField(id));
    if (error.response?.status ?? 0 > 499) {
      NotificationManager.error(
        'Неопознанная ошибка сервера, чип и дейл уже в пути'
      );
    }
    console.error(error);
  }
}
export function* updateImgFieldWatcher() {
  yield takeEvery(imgFieldsActionsAsync.updateImgField_async, updateImgField);
}
