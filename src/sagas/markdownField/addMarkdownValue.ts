import { markdownFieldService } from './../../apiWorker/servers/markdownService';
import { RootSelector } from './../../redux/createStore';
import { Either } from 'useful-monads';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import {
  markdowmAsyncActions,
  markdownActions,
} from '../../redux/slices/markdownFieldSlice';
import { MdFieldNotFoundById, MdDto } from '../../apiWorker/typings';

export function* addMarkdownValue(
  action: ReturnType<typeof markdowmAsyncActions.addMarkdownValue_async>
) {
  yield put(markdowmAsyncActions.addMarkdownValue_request(action.payload));

  const text: string = yield select<RootSelector<string>>(
    (state) =>
      state.markdowmField.items.find((markdowmField) => {
        return markdowmField.id === action.payload;
      })?.addValueText ?? ''
  );
  try {
    const valueEither: Either<MdFieldNotFoundById, MdDto> = yield call(
      markdownFieldService.addMarkdownValue,
      {
        fieldId: action.payload,
        value: text,
      }
    );
    const field = valueEither.extract();
    if (field.right) {
      yield put(
        markdownActions.addMarkdownValue({
          id: action.payload,
          value: field.right,
        })
      );
    } else {
      yield put(markdowmAsyncActions.addMarkdownValue_error(action.payload));
      NotificationManager.error(field.left.message);
    }
  } catch (error) {
    yield put(markdowmAsyncActions.addMarkdownValue_error(action.payload));
    NotificationManager.error(
      'Что-то пошло не так, но мы обязательно разберемся'
    );
  }
}
export function* addMarkdownValueWatcher() {
  yield takeEvery(
    markdowmAsyncActions.addMarkdownValue_async,
    addMarkdownValue
  );
}
