import { Either } from 'useful-monads';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import {
  imgFieldsActionsAsync,
  imgFieldsActions,
} from '../../slices/imgFieldsSlice';
import { RootSelector } from '../../createStore';
import {
  ScreenNotFoundById,
  ImgFieldAlreadyExistsInScreen,
  FlatImgFieldDto,
} from '../../../apiWorker/typings';
import { imgFieldsService } from '../../../apiWorker/servers/imgFieldService';

export function* addImgField(
  action: ReturnType<typeof imgFieldsActionsAsync.addImgFieldAsync>
) {
  yield put(imgFieldsActionsAsync.addImgFieldRequest(action.payload));

  const name: string = yield select<RootSelector<string>>(
    (state) => state.imgFields.addImgFieldName
  );
  const description: string = yield select<RootSelector<string>>(
    (state) => state.imgFields?.addImgFieldDescription ?? ''
  );
  try {
    const imgFieldEither: Either<
      ScreenNotFoundById | ImgFieldAlreadyExistsInScreen,
      FlatImgFieldDto
    > = yield call(imgFieldsService.addimgField, {
      name,
      description,
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
            addImgValue: undefined,
            addTheSameImgId: undefined,
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
