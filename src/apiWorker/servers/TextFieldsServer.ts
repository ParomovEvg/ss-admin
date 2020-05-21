import { SetTextValueType } from '../../redux/slices/textFieldsSlice';
// import { Either } from '@sweet-monads/either';
import { Either } from 'useful-monads';
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
import { DeleteFieldType } from '../../redux/slices/textFieldsSlice';
export const TextFieldServer = {
  deleteTextField: (
    id: number
  ): Promise<Either<TextFieldNotFoundById, DeleteFieldType>> =>
    api
      .delete(`text/field/${id}`)
      .json<DeleteTextFieldResDto>()
      .then(dtoToEither),

  addTextValue: (payload: SetTextValueType): Promise<TextDto | undefined> =>
    api
      .post('text/value', {
        json: {
          value: payload.text,
          fieldId: payload.fieldId,
        },
      })
      .json<CreateTextResDto>()
      .then((r) => r.payload),
  addTextField: (
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
