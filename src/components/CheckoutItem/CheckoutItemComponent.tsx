import { Card, Grid, IconButton } from '@material-ui/core';
import React from 'react';
import { createFipc } from 'react-fipc';
import DeleteIcon from '@material-ui/icons/Delete';
import './CheckoutItem.scss';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../redux/slices/viewSlice';
import { Loader } from '../Loader/Loader';

export type CheckoutItemComponentProps = {
  useCheckoutItem: (
    id: number
  ) => {
    isLoading: boolean;
  };
  name: string;
  address: string;
  id: number;
};

const CheckoutItemComponent: React.FC<CheckoutItemComponentProps> = ({
  name,
  useCheckoutItem,
  address,
  children,
  id,
}) => {
  const openDeleteModalCheckout = useAction(
    viewActions.openCheckoutDeleteModal
  );
  const { isLoading } = useCheckoutItem(id);
  return (
    <Grid item sm={4}>
      <Loader isLoading={isLoading} />
      <Card style={{ height: '100%' }}>
        <div className="checkout__item">
          <div className="checkout__delete">
            <IconButton
              onClick={() => openDeleteModalCheckout(id)}
              aria-label="settings"
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <div className="checkout__row">
            <span className="checkout__name">Номер кассы</span>
            <span className="checkout__value">{name}</span>
          </div>
          <div className="checkout__row">
            <span className="checkout__name">Адрес кассы</span>
            <span className="checkout__value">{address}</span>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

export const CheckoutItem$ = createFipc(CheckoutItemComponent);
