import {
  DeleteTextFieldResDto,
  TextFieldNotFoundById,
  CreateImgFieldDto,
  CreateImgFieldResDto,
  ScreenNotFoundById,
  ImgFieldAlreadyExistsInScreen,
  FlatImgFieldDto,
  ImgFieldNotFoundById,
  ImgDto,
  CreateImgResDto,
} from './../typings/index';
import { Either } from 'useful-monads';
import { dtoToEither } from '../dtoToEither';
import { api } from '../api';

export const imgFieldsService = {
  deleteimgField: (
    id: number
  ): Promise<Either<TextFieldNotFoundById, { id?: number | undefined }>> =>
    api
      .delete(`img/field/${id}`)
      .json<DeleteTextFieldResDto>()
      .then(dtoToEither),
  addimgField: (
    ImgField: CreateImgFieldDto
  ): Promise<
    Either<ScreenNotFoundById | ImgFieldAlreadyExistsInScreen, FlatImgFieldDto>
  > =>
    api
      .post(`img/field`, {
        json: ImgField,
      })
      .json<CreateImgFieldResDto>()
      .then(dtoToEither),
  addImg: (
    file: FormData,
    id: number
  ): Promise<Either<ImgFieldNotFoundById, ImgDto>> =>
    api
      .post(`img/field/${id}/value`, {
        body: file,
      })
      .json<CreateImgResDto>()
      .then(dtoToEither),
};
