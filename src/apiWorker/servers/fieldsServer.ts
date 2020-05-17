import { SetValueType } from './../../redux/slices/fieldsSlice';
// import { Either } from '@sweet-monads/either';
import { Either } from 'useful-monads';
import { EitherAsync } from 'useful-monads/EitherAsync.d';
import { dtoToEither } from '../dtoToEither';
import {
  DeleteTextFieldResDto,
  TextFieldNotFoundById,
  TextDto,
  CreateTextResDto,
  CreateTextFieldDto,
  CreateTextFieldResDto,
  TextFieldAlreadyExists,
  ScreenNotFoundById,
  FlatTextFieldDto,
} from '../typings/index';
import { api } from '../api';
import { DeleteFieldType } from '../../redux/slices/fieldsSlice';
export const fieldServer = {
  deleteField: (
    id: number
  ): Promise<Either<TextFieldNotFoundById, DeleteFieldType>> =>
    api
      .delete(`text/field/${id}`)
      .json<DeleteTextFieldResDto>()
      .then(dtoToEither),

  addValue: (payload: SetValueType): Promise<TextDto | undefined> =>
    api
      .post('text/value', {
        json: {
          value: payload.text,
          fieldId: payload.fieldId,
        },
      })
      .json<CreateTextResDto>()
      .then((r) => r.payload),
  addField: (
    payload: CreateTextFieldDto
  ): Promise<
    Either<ScreenNotFoundById | TextFieldAlreadyExists, FlatTextFieldDto>
  > =>
    api
      .post('text/field', {
        json: {
          name: payload.name,
          screenId: payload.screenId,
        },
      })
      .json<CreateTextFieldResDto>()
      .then(dtoToEither),
};
