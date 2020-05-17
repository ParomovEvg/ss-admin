import ky from 'ky';
import { getState, store } from '../redux/createStore';
import { authActions } from '../redux/slices/authSlice';
import { LoginResDto } from './typings';
export const api = ky.extend({
  prefixUrl: 'http://a0319139.xsph.ru:3000',
  hooks: {
    beforeRequest: [
      async (request) => {
        const { token } = getState().auth;
        request.headers.set('Authorization', `Bearer ${token}`);
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          try {
            const { phone, password } = getState().auth;
            const token = await ky
              .post('http://a0319139.xsph.ru:3000/auth', {
                json: {
                  phone,
                  password,
                },
              })
              .json<LoginResDto>()
              .then((r) => r.payload.access_token);
            store.dispatch(authActions.login({ token }));
            request.headers.set('Authorization', `Bearer ${token}`);
            return ky(request);
          } catch (e) {
            store.dispatch(authActions.logout({}));
            throw Error(e);
          }
        }
      },
    ],
  },
});
