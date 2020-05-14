import { LoginDto, LoginResDto } from '../typings';
import { api } from '../api';
export const authService = {
  auth: (loginDto: LoginDto): Promise<string> =>
    api
      .post('auth', {
        json: loginDto,
      })
      .json<LoginResDto>()
      .then((r) => r.payload.access_token),
  getProfile: () => api.get('auth/profile').json(),
};
