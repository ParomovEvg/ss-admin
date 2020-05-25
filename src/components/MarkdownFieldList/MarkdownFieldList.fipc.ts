import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';
import { MarkdownFieldList$ } from './MarkdownFieldListComponent';
import { MarkdowmType } from '../../redux/slices/markdownFieldSlice';

export const MarkdownFieldList = MarkdownFieldList$({
  useMarkdownFields: () => {
    const markdownFields = useSelector<RootState, MarkdowmType[]>(
      (state) => state.markdowmField.items
    );
    return { markdownFields };
  },
});
