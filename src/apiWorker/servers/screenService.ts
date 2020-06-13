import { Either } from 'useful-monads';
import { dtoToEither } from '../dtoToEither';
import {
  FindAllScreensResDto,
  ScreenNotFoundById,
  FlatScreenDto,
  ScreenDto,
  FindScreenByIdResDto,
  ChangeScreenNameResDto,
  ScreenAlreadyExists,
  CreateScreenResDto,
  DeleteScreenResDto,
} from '../typings/index';
import { api } from '../api';
export const screenServer = {
  getScreens: (): Promise<FlatScreenDto[]> =>
    api
      .get('screen')
      .json<FindAllScreensResDto>()
      .then((r) => r.payload),
  addScreen: (
    name: string,
    description: string
  ): Promise<Either<ScreenAlreadyExists, FlatScreenDto>> =>
    api
      .post('screen', {
        json: { name, description },
      })
      .json<CreateScreenResDto>()
      .then(dtoToEither),
  renameScreen: (
    id: number,
    name: string
  ): Promise<Either<ScreenNotFoundById, FlatScreenDto>> =>
    api
      .put(`screen/${id}`, {
        json: {
          name,
        },
      })
      .json<ChangeScreenNameResDto>()
      .then(dtoToEither),
  deleteScreen: (
    id: number
  ): Promise<Either<ScreenNotFoundById, { id?: number }>> =>
    api.delete(`screen/${id}`).json<DeleteScreenResDto>().then(dtoToEither),
  getScreen: (id: number): Promise<Either<ScreenNotFoundById, ScreenDto>> =>
    api.get(`screen/${id}`).json<FindScreenByIdResDto>().then(dtoToEither),
};
