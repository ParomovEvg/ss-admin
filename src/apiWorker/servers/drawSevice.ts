import { Either } from 'useful-monads';
import { api } from '../api';
import { dtoToEither } from '../dtoToEither';
import {
  FlatDrawDto,
  FindAllDrawResDto,
  CreateDrawDto,
  DatesAreTaken,
  EndEarlierThanStart,
  DateNotValid,
  CreateDrawResDto,
  DrawNotFoundById,
  FullDrawDto,
  FindFullDrawResDto,
  DeleteDrawResDto,
  ChangeDrawDto,
  ChangeDrawResDto,
  NotDrawNow,
  FindNowDrawResDto,
  CreateDrawNextDto,
} from '../typings';

export const drawServer = {
  getAllDraw: (): Promise<FlatDrawDto[] | undefined> =>
    api
      .get(`draw`)
      .json<FindAllDrawResDto>()
      .then((r) => r.payload),
  getDraw: (id: number): Promise<Either<DrawNotFoundById, FullDrawDto>> =>
    api.get(`draw/${id}`).json<FindFullDrawResDto>().then(dtoToEither),
  createNextDraw: (
    createDraw: CreateDrawNextDto
  ): Promise<
    Either<DatesAreTaken | EndEarlierThanStart | DateNotValid, FlatDrawDto>
  > =>
    api
      .post(`draw/next`, {
        json: createDraw,
      })
      .json<CreateDrawResDto>()
      .then(dtoToEither),
  getNowDraw: (): Promise<Either<NotDrawNow, FlatDrawDto>> =>
    api.get(`draw/now`).json<FindNowDrawResDto>().then(dtoToEither),
  updateDraw: (
    ChangeDraw: ChangeDrawDto,
    id: number
  ): Promise<Either<DrawNotFoundById, FlatDrawDto>> =>
    api
      .put(`draw/${id}`, {
        json: ChangeDraw,
      })
      .json<ChangeDrawResDto>()
      .then(dtoToEither),
  deleteDraw: (
    id: number
  ): Promise<Either<DrawNotFoundById, { id?: number }>> =>
    api.delete(`draw/${id}`).json<DeleteDrawResDto>().then(dtoToEither),
  addDraw: (
    createDraw: CreateDrawDto
  ): Promise<
    Either<DatesAreTaken | EndEarlierThanStart | DateNotValid, FlatDrawDto>
  > =>
    api
      .post(`draw`, {
        json: createDraw,
      })
      .json<CreateDrawResDto>()
      .then(dtoToEither),
};
