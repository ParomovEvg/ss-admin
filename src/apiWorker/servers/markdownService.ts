import {
  CreateMdDto,
  MdFieldNotFoundById,
  MdDto,
  CreateMdResDto,
  CreateMdFieldDto,
  ScreenNotFoundById,
  MdFieldAlreadyExistInScreen,
  FlatMdFieldDto,
  CreateMdFieldResDto,
  DeleteMdFieldResDto,
} from './../typings/index';
import { Either } from 'useful-monads';
import { dtoToEither } from '../dtoToEither';
import { api } from '../api';

export const markdownFieldService = {
  addMarkdownValue: (
    markdownField: CreateMdDto
  ): Promise<Either<MdFieldNotFoundById, MdDto>> =>
    api
      .post(`md/value`, {
        json: markdownField,
      })
      .json<CreateMdResDto>()
      .then(dtoToEither),
  addMarkdownField: (
    markdownField: CreateMdFieldDto
  ): Promise<
    Either<ScreenNotFoundById | MdFieldAlreadyExistInScreen, FlatMdFieldDto>
  > =>
    api
      .post(`md/field`, {
        json: markdownField,
      })
      .json<CreateMdFieldResDto>()
      .then(dtoToEither),
  deleteMarkdownField: (
    markdownFieldId: number
  ): Promise<Either<MdFieldNotFoundById, { id?: number }>> =>
    api
      .delete(`md/field/${markdownFieldId}`)
      .json<DeleteMdFieldResDto>()
      .then(dtoToEither),
};
