import { setValueType } from '../../redux/slices/fieldValuesSlice';
import { CreateTextResDto, TextDto } from '../typings';
import { api } from '../api';

export const fieldValueService = {
  setValue: (payload: setValueType): Promise<TextDto | undefined> =>
    api
      .post('text/value', {
        json: {
          value: payload.text,
          fieldId: payload.fieldId,
        },
      })
      .json<CreateTextResDto>()
      .then((r) => r.payload),
};
