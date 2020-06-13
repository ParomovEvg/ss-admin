import React from 'react';
import { Layout } from '../Layout/Layout';
import { createFipc } from 'react-fipc';
import { Loader } from '../Loader/Loader';
import { Grid, Card, Button } from '@material-ui/core';
import { AddDrawModal } from '../AddDrawModal/AddDrawModal.fipc';
import { DrawCard } from '../DrawCard/DrawCard.fipc';
import './DrawList.scss';
import { drawType } from '../../redux/slices/draw/drawListSlice';
import { DeleteModalDraw } from '../deleteModal/deleteModalDraw';
import { UpdateDrawModal } from '../UpdateDrawModal/UpdateDrawModal.fipc';
import { DrawNowCard } from '../DrawNowCard/DrawNowCard.fipc';

export interface DrawsProps {
  className?: string;
  useDrawsList: () => void;
  useIsLoading: () => boolean;
  useOpenAddDrawModal: () => () => void;
  useAllDraw: () => drawType[];
  useNowDraw: () => drawType | null;
}

export const DrawsListComponent: React.FC<DrawsProps> = ({
  useDrawsList,
  useOpenAddDrawModal,
  useAllDraw,
  useIsLoading,
  useNowDraw,
}) => {
  useDrawsList();
  const allDraw = useAllDraw();
  const isLoading = useIsLoading();
  const openAddDrawModal = useOpenAddDrawModal();
  const drowNow = useNowDraw();
  return (
    <Layout title="Розыгрыши">
      <Loader isLoading={isLoading} />
      <div className="draw">
        <h2 className="draw__title">Текущий розыгрыш</h2>
        <div className="draw__list">
          {drowNow ? (
            <>
              <DrawNowCard
                id={drowNow.id}
                key={drowNow.id}
                description={drowNow.description}
                start={drowNow.start}
                end={drowNow.end}
                sLimit={drowNow.sLimit}
                qrLimit={drowNow.qrLimit}
                qrLimitPeriodMS={drowNow.qrLimitPeriodMS}
              />
            </>
          ) : (
            'Текущий розыгрыш не найден'
          )}
        </div>
        <h2 className="draw__title">Все розыгрыши</h2>
        <Button
          className="AddCard draw__AddCard"
          onClick={() => openAddDrawModal()}
          color="primary"
        >
          Добавить новый розыгрыш
        </Button>
        <div className="draw__list">
          {allDraw.map((draw) => {
            return (
              <DrawCard
                id={draw.id}
                key={draw.id}
                description={draw.description}
                start={draw.start}
                end={draw.end}
                sLimit={draw.sLimit}
                qrLimit={draw.qrLimit}
                qrLimitPeriodMS={draw.qrLimitPeriodMS}
              />
            );
          })}
        </div>
      </div>
      <AddDrawModal />
      <UpdateDrawModal />
      <DeleteModalDraw />
    </Layout>
  );
};

export const DrawsList$ = createFipc(DrawsListComponent);
