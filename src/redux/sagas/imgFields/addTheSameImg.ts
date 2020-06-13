import { Either } from 'useful-monads';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import {
  imgFieldsActionsAsync,
  imgFieldsActions,
} from '../../slices/imgFieldsSlice';
import { RootSelector } from '../../createStore';
import { imgFieldsService } from '../../../apiWorker/servers/imgFieldService';
import { ImgFieldNotFoundById, ImgFieldDto } from '../../../apiWorker/typings';

export function* addTheSameImg(
  action: ReturnType<typeof imgFieldsActionsAsync.addTheSameImg_async>
) {
  try {
    yield put(imgFieldsActionsAsync.addTheSameImg_request(action.payload));

    const imgId: number = yield select<RootSelector<number>>(
      (state) =>
        state.imgFields.items.find((imgField) => imgField.id === action.payload)
          ?.addTheSameImgId ?? 0
    );

    yield call(imgFieldsService.addTheSameImg, imgId);
    const imgFieldEither: Either<
      ImgFieldNotFoundById,
      ImgFieldDto
    > = yield call(imgFieldsService.getImgField, action.payload);
    const imgField = imgFieldEither.extract();

    if (imgField.right) {
      yield put(
        imgFieldsActions.changeImgField({
          imgField: {
            ...imgField.right,
            isLoading: false,
          },
          id: action.payload,
        })
      );
    } else {
      yield put(imgFieldsActionsAsync.addTheSameImg_error(action.payload));
      NotificationManager.error(imgField.left.message);
    }
  } catch (error) {
    yield put(imgFieldsActionsAsync.addTheSameImg_error(action.payload));
    NotificationManager.error(
      'Что-то пошло не так, но мы обязательно разберемся'
    );
    console.error(error);
  }
}
export function* addTheSameImgWatcher() {
  yield takeEvery(imgFieldsActionsAsync.addTheSameImg_async, addTheSameImg);
}
