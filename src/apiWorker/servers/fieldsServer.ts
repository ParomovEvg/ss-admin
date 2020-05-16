import { Either } from '@sweet-monads/either';
import { dtoToEither } from '../dtoToEither';
import { DeleteTextFieldResDto, TextFieldNotFoundById } from '../typings/index';
import { api } from '../api';
import { deleteFieldType } from '../../redux/slices/fieldsSlice';
export const fieldServer = {
  deleteField: (
    id: number
  ): Promise<Either<TextFieldNotFoundById, deleteFieldType>> =>
    api.get(`text/field/${id}`).json<DeleteTextFieldResDto>().then(dtoToEither),
};
