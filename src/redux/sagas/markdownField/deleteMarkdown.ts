import { NotificationManager } from 'react-notifications';
import { Either } from 'useful-monads';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  markdowmAsyncActions,
  markdownActions,
} from '../../slices/markdownFieldSlice';
import { MdFieldNotFoundById } from '../../../apiWorker/typings';
import { markdownFieldService } from '../../../apiWorker/servers/markdownService';

export function* deleteMarkdown(
  action: ReturnType<typeof markdowmAsyncActions.deleteMarkdown_async>
) {
  yield put(markdowmAsyncActions.deleteMarkdown_request(action.payload));
  try {
    const markdownFieldIdEither: Either<
      MdFieldNotFoundById,
      { id?: number }
    > = yield call(markdownFieldService.deleteMarkdownField, action.payload);

    const field = markdownFieldIdEither.extract();

    if (field.right) {
      yield put(markdownActions.deleteMarkdownField(action.payload));
    } else {
      yield put(markdowmAsyncActions.deleteMarkdown_error(action.payload));
      NotificationManager.error(field.left.message);
    }
  } catch (error) {
    yield put(markdowmAsyncActions.deleteMarkdown_error(action.payload));
    if (error.response?.status ?? 0 > 499) {
      NotificationManager.error(
        'Неопознанная ошибка сервера, чип и дейл уже в пути'
      );
    } else {
      NotificationManager.error(
        'Что-то пошло не так, но мы обязательно разберемся'
      );
    }
    console.error(error);
  }
}
export function* deleteMarkdownWatcher() {
  yield takeEvery(markdowmAsyncActions.deleteMarkdown_async, deleteMarkdown);
}
