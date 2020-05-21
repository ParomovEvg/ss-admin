import { RootSelector } from './../../redux/createStore';
import { imgFieldsService } from './../../apiWorker/servers/imgFieldService';
import { Either } from 'useful-monads';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import {
  ScreenNotFoundById,
  ImgFieldAlreadyExistsInScreen,
  FlatImgFieldDto,
} from '../../apiWorker/typings';
import { NotificationManager } from 'react-notifications';
import {
  imgFieldsActionsAsync,
  imgFieldsActions,
} from '../../redux/slices/imgFieldsSlice';

export function* addImgField(
  action: ReturnType<typeof imgFieldsActionsAsync.addImgFieldAsync>
) {
  yield put(imgFieldsActionsAsync.addImgFieldRequest(action.payload));

  const name = yield select<RootSelector<string>>(
    (state) => state.imgFields.addImgFieldName
  );
  try {
    const imgFieldEither: Either<
      ScreenNotFoundById | ImgFieldAlreadyExistsInScreen,
      FlatImgFieldDto
    > = yield call(imgFieldsService.addimgField, {
      name,
      screenId: action.payload,
    });
    const field = imgFieldEither.extract();

    if (field.right) {
      yield put(
        imgFieldsActions.addImgField({
          item: {
            ...field.right,
            img: [],
            isLoading: false,
          },
          id: action.payload,
        })
      );
    } else {
      yield put(imgFieldsActionsAsync.addImgFieldError(action.payload));
      NotificationManager.error(field.left.message);
    }
  } catch (error) {
    yield put(imgFieldsActionsAsync.addImgFieldError(action.payload));
    NotificationManager.error(
      'Что-то пошло не так, но мы обязательно разберемся'
    );
  }
}
export function* addImgFieldWatcher() {
  yield takeEvery(imgFieldsActionsAsync.addImgFieldAsync, addImgField);
}
