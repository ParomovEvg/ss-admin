import { Either } from 'useful-monads';
import { dtoToEither } from '../dtoToEither';
import {
  FindAllScreensResDto,
  ScreenNotFoundById,
  FlatScreenDto,
  CreateScreenResDto,
  ScreenDto,
  FindScreenByIdResDto,
} from '../typings/index';
import { api } from '../api';
export const screenServer = {
  getScreens: (): Promise<FlatScreenDto[]> =>
    api
      .get('screen')
      .json<FindAllScreensResDto>()
      .then((r) => r.payload),
  // addScreen: () =>
  //   api
  //     .post('screen', {
  //       json: { name: 'Hone234' },
  //     })
  //     .json<CreateScreenResDto>()
  //     .then((r) => ({
  //       ...r.payload,
  //       status: 'done',
  //     })),
  getScreen: (id: number): Promise<Either<ScreenNotFoundById, ScreenDto>> =>
    api.get(`screen/${id}`).json<FindScreenByIdResDto>().then(dtoToEither),
};
