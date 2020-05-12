import { Either, left, right } from '@sweet-monads/either';

export type Dto = {
  payload?: any;
};

type ValueOf<T> = T[keyof T];
type ErrorsOfDto<T extends Dto> = ValueOf<Required<Omit<T, 'payload'>>>;

export const dtoToEither = <T extends Dto>(
  dto: T
): Either<ErrorsOfDto<T>, Required<T>['payload']> => {
  if (dto.payload) {
    return right(dto.payload);
  } else {
    const { payload, ...errors } = dto;
    const [error] = Object.values(errors);
    return left(error);
  }
};
