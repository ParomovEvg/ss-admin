import { IsLoadingSliceConstructor } from '../../../constructors/isLoadingConstructorSlice';

export const {
  actions: qrLoadingActions,
  reducer: qrLoadingReducer,
} = IsLoadingSliceConstructor('qr/loading');
