import ky from 'ky';
import { useSelector } from 'react-redux';
import { RootSelector, RootState, store } from '../model/createStore';
import { Auth, authActions } from '../model/authSlice';
import { useAction } from '../view/hooks/use-action';
import { LoginResDto } from './typings';
export const api = ky.extend({
  prefixUrl: 'http://localhost:3000',
  hooks: {
    beforeRequest: [
      async (request) => {
        const { token } = store.getState().auth;
        request.headers.set('Authorization', `Bearer `);
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          try {
            const { phone, password } = store.getState().auth;
            const token = await ky
              .post('http://localhost:3000/auth', {
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
