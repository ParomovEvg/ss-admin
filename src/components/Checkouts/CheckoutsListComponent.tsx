import React from 'react';
import { createFipc } from 'react-fipc';
import { Grid, Button, Card } from '@material-ui/core';
import { Layout } from '../Layout/Layout';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/createStore';
import { Loader } from '../Loader/Loader';
import { CheckoutType } from '../../redux/slices/checkoutSlice';
import { CheckoutItem } from '../CheckoutItem/CheckoutItem.fipc';
import { DeleteModalCheckout } from '../deleteModal/deleteModalCheckout';
import { AddCheckoutModal } from '../AddCheckoutModal/AddCheckoutModal.fipc';
import { viewActions } from '../../redux/slices/viewSlice';
import { useAction } from '../../hooks/use-action';

type CheckoutComponentProps = {
  useGetCheckouts: () => {
    checkouts: CheckoutType[];
  };
};

export const CheckoutComponent: React.FC<CheckoutComponentProps> = ({
  useGetCheckouts,
}) => {
  const { checkouts } = useGetCheckouts();
  const isLoading: boolean = useSelector<RootState, boolean>(
    (state) => state.checkouts.isLoading
  );
  const openAddCheckoutModal = useAction(viewActions.openAddCheckoutModal);
  return (
    <Layout title="Кассы">
      <Loader isLoading={isLoading} />
      <div className="Checkout__list">
        <Grid container spacing={3}>
          {checkouts.map(({ address, fn, id }) => {
            return <CheckoutItem id={id} name={fn} address={address} />;
          })}
          <AddCheckoutModal />
          <Grid item sm={4}>
            <Card className="AddCard">
              <Button onClick={() => openAddCheckoutModal()} color="primary">
                Добавить кассу
              </Button>
            </Card>
          </Grid>
          <DeleteModalCheckout />
        </Grid>
      </div>
    </Layout>
  );
};

export const Checkout$ = createFipc(CheckoutComponent);
