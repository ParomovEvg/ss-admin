import {
  imgFieldsActionsAsync,
  imgFieldsActions,
} from './../../redux/slices/imgFieldsSlice';
import { RootSelector } from './../../redux/createStore';
import { imgFieldsService } from './../../apiWorker/servers/imgFieldService';
import { Either } from 'useful-monads';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { ImgFieldNotFoundById, ImgDto } from '../../apiWorker/typings';

export function* addImg(
  action: ReturnType<typeof imgFieldsActionsAsync.addImg_async>
) {
  try {
    yield put(imgFieldsActionsAsync.addImg_request(action.payload));

    const url: string = yield select<RootSelector<string | undefined>>(
      (state) =>
        state.imgFields.items.find((imgField) => imgField.id === action.payload)
          ?.addImgValue ?? ''
    );
    const type: string = yield select<RootSelector<string | undefined>>(
      (state) =>
        state.imgFields.items.find((imgField) => imgField.id === action.payload)
          ?.addImgValueType ?? ''
    );

    const file = yield fetch(url)
      .then((r) => r.blob())
      .then(
        (b) =>
          new File([b], 'newFile', {
            type,
          })
      );

    const formFile = new FormData();
    formFile.append('file', file);

    const imgEither: Either<ImgFieldNotFoundById, ImgDto> = yield call(
      imgFieldsService.addImg,
      formFile,
      action.payload
    );

    const img = imgEither.extract();

    if (img.right) {
      yield put(
        imgFieldsActions.addImg({
          img: img.right,
          id: action.payload,
        })
      );
    } else {
      yield put(imgFieldsActionsAsync.addImg_error(action.payload));
      NotificationManager.error(img.left.message);
    }
  } catch (error) {
    yield put(imgFieldsActionsAsync.addImg_error(action.payload));
    NotificationManager.error(
      'Что-то пошло не так, но мы обязательно разберемся'
    );
    console.error(error);
  }
}
export function* addImgWatcher() {
  yield takeEvery(imgFieldsActionsAsync.addImg_async, addImg);
}
