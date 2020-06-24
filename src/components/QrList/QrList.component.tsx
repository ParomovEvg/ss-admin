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
import { QrPagination } from '../Pagination/QrPagination.fipc';

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
    <>
      <Loader isLoading={isLoading} />
      <Layout title={'Qr-коды'}>
        <Grid container spacing={4} className="qr">
          <Grid item sm={3}>
            <SideBar>
              <FIlterForm />
            </SideBar>
          </Grid>
          <Grid item container spacing={2} sm={9}>
            <Grid item sm={12}>
              <SearchQr />
            </Grid>
            {qrs.map((qr) => (
              <Grid key={qr.id} item sm={12}>
                <QrCard qr={qr} />
              </Grid>
            ))}
            <Grid item sm={12}>
              <QrPagination />
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export const QrList$ = createFipc(QrListComponent);
