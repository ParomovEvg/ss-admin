import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';
import { ImgFieldList$ } from './ImgFieldListComponent';
import { ImgFieldDto } from '../../apiWorker/typings';

export const ImgFieldList = ImgFieldList$({
  useImgFields: () => {
    const imgFields = useSelector<RootState, ImgFieldDto[]>(
      (state) => state.imgFields.items
    );

    return { imgFields };
  },
});
