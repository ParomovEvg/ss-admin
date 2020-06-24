import React from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControl,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { createFipc } from 'react-fipc';

import { FilterFormHooks } from './FIlterForm.fipc';
import './FilterForm.scss';
import { Loader } from '../Loader/Loader';

export interface FilterFormProps extends FilterFormHooks {
  className?: string;
}

export const FilterFormComponent: React.FC<FilterFormProps> = ({
  useHandleChangeInput,
  useHandlerChangeAutocomplite,
  useValues,
  useDraws,
  useCheckouts,
  useLoading,
  usePhones,
  usePhoneHandler,
  useEffectFilter,
}) => {
  useEffectFilter();
  const inputChange = useHandleChangeInput();
  const autocompliteChange = useHandlerChangeAutocomplite();
  const values = useValues();
  const draws = useDraws();
  const checkouts = useCheckouts();
  const Isloading = useLoading();
  const phones = usePhones();
  const changePhoneHandler = usePhoneHandler();
  return (
    <form className="qr__form filter-form">
      <Loader isLoading={Isloading} />
      <h2 className="filter-form__title">Фильтрация</h2>
      <div className="filter-form__control">
        <FormControl>
          <InputLabel id="draw">Выбирите Розыгрыш</InputLabel>
          <Select onChange={inputChange} labelId="draw" name="filterByDrawId">
            {draws.map((draw) => (
              <MenuItem key={draw.id} value={draw.id}>
                {draw.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="filter-form__control">
        <FormControl>
          <InputLabel id="checkout" className="filter-form__label">
            Выбирите кассу
          </InputLabel>
          <Select
            onChange={inputChange}
            labelId="checkout"
            name="filterByCheckoutId"
          >
            {checkouts.map((checkout) => (
              <MenuItem key={checkout.id} value={checkout.id}>
                {checkout.fn}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="filter-form__control">
        <Autocomplete
          inputValue={values.filterByPhone}
          onInputChange={(event, newInputValue) => {
            autocompliteChange('filterByPhone', newInputValue);
            changePhoneHandler(newInputValue);
          }}
          options={phones}
          getOptionLabel={(phone) => phone?.phone ?? ''}
          renderInput={(params) => (
            <TextField
              {...params}
              name="filterByPhone"
              label="Введите телефон"
              variant="outlined"
            />
          )}
        />
      </div>
    </form>
  );
};

export const FIlterForm$ = createFipc(FilterFormComponent);
