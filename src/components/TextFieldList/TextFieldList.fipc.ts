import { TextFieldList$ } from './TextFieldListComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';
import { TextFieldType } from '../../redux/slices/textFieldsSlice';

export const TextFieldList = TextFieldList$({
  useTextFields: () => {
    const textFields = useSelector<RootState, TextFieldType[]>(
      (state) => state.TextFields.items
    );

    return { textFields };
  },
});
