import React from 'react';
import { createFipc } from 'react-fipc';

import { SideBar } from '../SideBar/SideBar.fipc';
import { Layout } from '../Layout/Layout';
import { QrListHooks } from './QrList.fipc';
import { FIlterForm } from '../FilterForm/FIlterForm.fipc';
import { SearchQr } from '../SearchQr/SearchQr.fipc';
import { Loader } from '../Loader/Loader';
import './QrList.scss';

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
      <div className="qr">
        <SideBar>
          <FIlterForm />
        </SideBar>
        <SearchQr />
        {qrs.map((qr) => (
          <span>{qr.phone.phone}</span>
        ))}
      </div>
    </Layout>
  );
};

export const QrList$ = createFipc(QrListComponent);
