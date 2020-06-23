import React from 'react';
import { createFipc } from 'react-fipc';
import { TextField, Button } from '@material-ui/core';

import './SearchQr.scss';
import { SearchQrHooks } from './SearchQr.fipc';

export interface SearchQrProps extends SearchQrHooks {}

export const SearchQrComponent: React.FC<SearchQrProps> = ({ useForm }) => {
  const formik = useForm();
  return (
    <div className="search-qr">
      <form onSubmit={formik.handleSubmit} className="search-qr__form">
        <TextField
          name="fdFind"
          label="fd qr-кода"
          variant="outlined"
          value={formik.values.fdFind}
          onChange={formik.handleChange}
        />
        <TextField
          name="fpFind"
          label="fp qr-кода"
          variant="outlined"
          value={formik.values.fpFind}
          onChange={formik.handleChange}
        />
        <Button variant={'contained'} color={'primary'} type="submit">
          Искать
        </Button>
      </form>
    </div>
  );
};

export const SearchQr$ = createFipc(SearchQrComponent);
