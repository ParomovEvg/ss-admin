import React from 'react';
import { createFipc } from 'react-fipc';

import { SideBar } from '../SideBar/SideBar.fipc';
import { Layout } from '../Layout/Layout';
import { QrListHooks } from './QrList.fipc';
import { FIlterForm } from '../FilterForm/FIlterForm.fipc';
import { SearchQr } from '../SearchQr/SearchQr.fipc';
import { Loader } from '../Loader/Loader';
import './QrList.scss';
import { Grid } from '@material-ui/core';
import { QrCard } from '../QrCard/QrCard.fipc';

export interface QrListProps extends QrListHooks {
  className?: string;
}

const QrListComponent: React.FC<QrListProps> = ({
  useEffectQr,
  useLoading,
  useQrs,
}) => {
  useEffectQr();
  const isLoading = useLoading();
  const qrs = useQrs();
  return (
    <Layout title={'Qr-коды'}>
      <Loader isLoading={isLoading} />
      <Grid container spacing={4} className="qr">
        <Grid item sm={3}>
          <SideBar>
            <FIlterForm />
          </SideBar>
        </Grid>
        <Grid item sm={9}>
          <SearchQr />
          {qrs.map((qr) => (
            <QrCard qr={qr} />
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
};

export const QrList$ = createFipc(QrListComponent);
