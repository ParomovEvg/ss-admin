import {
  CreateCheckoutResDto,
  CheckoutAlreadyExists,
  CreateCheckoutDto,
} from './../typings/index';
import { Either } from 'useful-monads';
import {
  FindAllCheckoutsResDto,
  FlatCheckoutDto,
  DeleteCheckoutResDto,
  CheckoutNotFoundById,
} from '../typings/index';
import { api } from '../api';
import { dtoToEither } from '../dtoToEither';
export const CheckoutsServer = {
  getAllCheckout: (): Promise<FlatCheckoutDto[] | undefined> =>
    api
      .get(`checkout`)
      .json<FindAllCheckoutsResDto>()
      .then((r) => r.payload),
  deleteCheckout: (
    id: number
  ): Promise<
    Either<
      CheckoutNotFoundById,
      {
        checkoutId?: number;
      }
    >
  > =>
    api.delete(`checkout/${id}`).json<DeleteCheckoutResDto>().then(dtoToEither),
  addCheckout: (
    checkout: CreateCheckoutDto
  ): Promise<Either<CheckoutAlreadyExists, FlatCheckoutDto>> =>
    api
      .post(`checkout`, {
        json: checkout,
      })
      .json<CreateCheckoutResDto>()
      .then(dtoToEither),
};
