import { RootState } from './../../redux/createStore';
import { useSelector } from 'react-redux';
import { ImgCard$ } from './ImgCard';

export const ImgCard = ImgCard$({
  useImgField: (id) => {
    const isLoading = useSelector<RootState, boolean>(
      (state) =>
        state.imgFields.items.find((imgField) => imgField.id === id)
          ?.isLoading ?? false
    );
    return {
      isLoading,
    };
  },
});
