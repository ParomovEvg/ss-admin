import { RootState } from './../../redux/createStore';
import { useSelector } from 'react-redux';
import { Loader$ } from './Loader';

// export const ScreenLoader = Loader$({
//   useIsLoading: () => {
//     const screenId = useSelector<RootState, number>(
//       (state) => state.screens.activeScreen
//     );
//     const status = useSelector<RootState>(
//       (state) =>
//         state.screens.screensList.find((screen) => screen.id === screenId)
//           ?.status ?? 'done'
//     );
//     console.log(status);
//     return status === 'loading';
//   },
// });
