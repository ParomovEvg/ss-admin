import { Auth$ } from './Auth';
import { ChangeEventHandler, FormEvent, useCallback } from 'react';
import { useAction } from '../../hooks/use-action';
import { authActions } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';

export const Auth = Auth$({
  useSubmitHandler: () => {
    const loginAction = useAction(authActions.loginRequest);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      loginAction();
    };
    return handleSubmit;
  },
  usePhoneInput: () => {
    const phone = useSelector<RootState, string>((state) => state.auth.phone);
    const handleSetPhone = useAction(authActions.setPhone);
    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        handleSetPhone(e.target.value);
      },
      [handleSetPhone]
    );
    return [phone, handleChange];
  },
  usePasswordInput: () => {
    const password = useSelector<RootState, string>(
      (state) => state.auth.password
    );
    const handleSetPassword = useAction(authActions.setPassword);
    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        handleSetPassword(e.target.value);
      },
      [handleSetPassword]
    );
    return [password, handleChange];
  },
  useIsLoading: () => {
    return useSelector<RootState, boolean>((state) => state.auth.isLoading);
  },
});
