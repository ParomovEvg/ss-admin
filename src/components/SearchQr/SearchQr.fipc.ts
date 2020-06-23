import { FormikProps, useFormik } from 'formik';

import { SearchQr$ } from './SearchQr.component';
import { useAction } from '../../hooks/use-action';
import { qrFilterActions } from '../../redux/slices/qr/filterQrsSlice';

export interface UseFormikInitState {
  fpFind: string;
  fdFind: string;
}

export interface SearchQrHooks {
  useForm: () => FormikProps<UseFormikInitState>;
}

export const SearchQr = SearchQr$({
  useForm: () => {
    const filterQr = useAction(qrFilterActions.filterQr);

    const initialValues: UseFormikInitState = {
      fpFind: '',
      fdFind: '',
    };
    return useFormik({
      initialValues,
      onSubmit: (values, formikActions) => {
        filterQr({ values, formikActions });
      },
    });
  },
});
