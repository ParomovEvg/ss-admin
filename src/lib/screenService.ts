import { FindAllScreensResDto, FlatScreenDto, CreateScreenResDto, ScreenDto, FindScreenByIdResDto } from './typings/index';
// import { LoginDto, LoginResDto } from './typings';
import { api } from './api';
export const screenServer = {
  getScreens: (): Promise<FlatScreenDto[]> =>
    api
      .get('screen')
			.json<FindAllScreensResDto>()
			.then(r => r.payload),
  addScreen: (): Promise<FlatScreenDto | undefined> =>
    api
      .post('screen', {
				json: { name: 'Hone234' }
			})
			.json<CreateScreenResDto>()
			.then(r => r.payload),
  getScreen: (id: number): Promise<ScreenDto | undefined> =>
    api
      .get(`screen/${id}`)
			.json<FindScreenByIdResDto>()
			.then(r => r.payload)
			
};
 