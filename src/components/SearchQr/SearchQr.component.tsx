import React from 'react';
import { createFipc } from 'react-fipc';
import { TextField, Button } from '@material-ui/core';

import './SearchQr.scss';
import { SearchQrHooks } from './SearchQr.fipc';

export interface SearchQrProps extends SearchQrHooks {}

export const SearchQrComponent: React.FC<SearchQrProps> = ({
  useValues,
  useHandleChangeInput,
  useFormHandler,
}) => {
  const values = useValues();
  const formChange = useFormHandler();
  const inputChange = useHandleChangeInput();
  return (
    <div className="search-qr">
      <form onSubmit={formChange} className="search-qr__form">
        <TextField
          name="filterByFd"
          label="fd qr-кода"
          variant="outlined"
          value={values.filterByFd}
          onChange={inputChange}
        />
        <TextField
          name="filterByFp"
          label="fp qr-кода"
          variant="outlined"
          value={values.filterByFp}
          onChange={inputChange}
        />
        <Button variant={'contained'} color={'primary'} type="submit">
          Искать
        </Button>
      </form>
    </div>
  );
};

export const SearchQr$ = createFipc(SearchQrComponent);
