import React from 'react';
import { createFipc } from 'react-fipc';
import { Loader } from '../Loader/Loader';
import { DrawNowCardHooks } from './DrawNowCard.fipc';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import {
  IconButton,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import './DrawNowCard.scss';

export interface DrawNowCardProps extends DrawNowCardHooks {
  className?: string;
  multiline?: boolean;
  id: number;
  description: string;
  start: string;
  end: string;
  sLimit: number;
  qrLimit: number;
  qrLimitPeriodMS: number;
}

export const DrawNowCardComponent: React.FC<DrawNowCardProps> = ({
  children,
  className,
  description,
  id,
  start,
  end,
  sLimit,
  qrLimit,
  qrLimitPeriodMS,
  useNowDraw,
  useOpenUpdateDrawModal,
  useOpenDeleteDrawModal,
  useOpenNextDrawModal,
}) => {
  const { isLoading } = useNowDraw(id);
  const openUpdateDrawModal = useOpenUpdateDrawModal(id);
  const openDeleteDrawModal = useOpenDeleteDrawModal(id);
  const openNextDrawModal = useOpenNextDrawModal();
  return (
    <Card className="card">
      <Loader isLoading={isLoading} />
      <CardHeader
        title={description}
        action={
          <>
            <IconButton onClick={openDeleteDrawModal} aria-label="settings">
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={openUpdateDrawModal} aria-label="settings">
              <CreateIcon />
            </IconButton>
            <IconButton onClick={openNextDrawModal} aria-label="settings">
              <AddIcon />
            </IconButton>
          </>
        }
      />
      <CardContent>
        <div className="draw-card__content">
          <div className="draw-card__row">
            <span className="draw-card__name">Минимальная сумма чека — </span>
            <span>{sLimit == 0 ? 'нет' : `${sLimit} ₽`}</span>
          </div>
          <div className="draw-card__row">
            <span className="draw-card__name">
              Максимальное количество qr-кодов(в штуках) —
            </span>
            <span>{qrLimit == 0 ? 'нет ограничения' : qrLimit}</span>
          </div>
          <div className="draw-card__row">
            <span className="draw-card__name">
              Время сбраса блокировки на загрузку qr-кодов(в часах) —
            </span>
            <span>
              {qrLimitPeriodMS == 0
                ? 'На период розыгрыша'
                : Math.floor(qrLimitPeriodMS / 3600 / 1000)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const DrawNowCard$ = createFipc(DrawNowCardComponent);
