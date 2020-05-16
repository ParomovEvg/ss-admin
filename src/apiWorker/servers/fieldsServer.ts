import { setValueType } from './../../redux/slices/fieldsSlice';
import { Either } from '@sweet-monads/either';
import { dtoToEither } from '../dtoToEither';
import {
  DeleteTextFieldResDto,
  TextFieldNotFoundById,
  TextDto,
  CreateTextResDto,
} from '../typings/index';
import { api } from '../api';
import { deleteFieldType } from '../../redux/slices/fieldsSlice';
export const fieldServer = {
  deleteField: (
    id: number
  ): Promise<Either<TextFieldNotFoundById, deleteFieldType>> =>
    api.get(`text/field/${id}`).json<DeleteTextFieldResDto>().then(dtoToEither),

  setValue: (payload: setValueType): Promise<TextDto | undefined> =>
    api
      .post('text/value', {
        json: {
          value: payload.text,
          fieldId: payload.fieldId,
        },
      })
      .json<CreateTextResDto>()
      .then((r) => r.payload),
};
