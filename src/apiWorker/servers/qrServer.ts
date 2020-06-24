import {
  GetAllPhoneResDto,
  GetPhoneDto,
  FilterQrDto,
  FilterQrResDto,
  GetQrNumResDto,
  FlatGetQrFilterDto,
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
  qrFilter: (filter: FilterQrDto): Promise<FlatGetQrFilterDto> =>
    api
      .post('qr/filter', { json: filter })
      .json<FilterQrResDto>()
      .then((r) => r.payload),
  qrCount: (): Promise<string> =>
    api
      .get('qr/count')
      .json<GetQrNumResDto>()
      .then((r) => r.payload),
};
