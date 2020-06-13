import { Either } from 'useful-monads';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import {
  markdowmAsyncActions,
  markdownActions,
} from '../../slices/markdownFieldSlice';
import { RootSelector } from '../../createStore';
import {
  ScreenNotFoundById,
  MdFieldAlreadyExistInScreen,
  FlatMdFieldDto,
} from '../../../apiWorker/typings';
import { markdownFieldService } from '../../../apiWorker/servers/markdownService';

export function* addMarkdownField(
  action: ReturnType<typeof markdowmAsyncActions.addMarkdownField_async>
) {
  yield put(markdowmAsyncActions.addMarkdownField_request(action.payload));

  const name: string = yield select<RootSelector<string>>(
    (state) => state.markdowmField.addMarkdownFieldName
  );
  const label: string = yield select<RootSelector<string>>(
    (state) => state.markdowmField.addMarkdownFieldLabel
  );

  try {
    const markdownFieldEither: Either<
      ScreenNotFoundById | MdFieldAlreadyExistInScreen,
      FlatMdFieldDto
    > = yield call(markdownFieldService.addMarkdownField, {
      label,
      name,
      screenId: action.payload,
    });

    const field = markdownFieldEither.extract();

    if (field.right) {
      yield put(
        markdownActions.addMarkdownField({
          markdownField: {
            ...field.right,
            isLoading: false,
            values: [],
          },
          screenId: action.payload,
        })
      );
    } else {
      yield put(markdowmAsyncActions.addMarkdownField_error(action.payload));
      NotificationManager.error(field.left.message);
    }
  } catch (error) {
    yield put(markdowmAsyncActions.addMarkdownField_error(action.payload));
    NotificationManager.error(
      'Что-то пошло не так, но мы обязательно разберемся'
    );
  }
}
export function* addMarkdownFieldWatcher() {
  yield takeEvery(
    markdowmAsyncActions.addMarkdownField_async,
    addMarkdownField
  );
}
