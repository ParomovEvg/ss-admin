import {
  GetAllPhoneResDto,
  GetPhoneDto,
  FilterQrDto,
  FilterQrResDto,
  FlatAllQrDto,
} from './../typings/index';
import { api } from '../api';
import { dtoToEither } from '../dtoToEither';

export const qrServer = {
  changePhone: (phone: string): Promise<GetPhoneDto[]> =>
    api
      .post(`auth/phone/search`, {
        json: {
          phone,
        },
      })
      .json<GetAllPhoneResDto>()
      .then((r) => r.payload),
  qrFilter: (filter: FilterQrDto): Promise<FlatAllQrDto[]> =>
    api
      .post('qr/filter', { json: filter })
      .json<FilterQrResDto>()
      .then((r) => r.payload ?? []),
};
