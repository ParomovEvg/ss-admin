import React from 'react';
import { createFipc } from 'react-fipc';
import { Loader } from '../Loader/Loader';
import { DrawNowCardHooks } from './DrawNowCard.fipc';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Card, CardHeader, CardContent } from '@material-ui/core';
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
}) => {
  const { isLoading } = useNowDraw(id);
  const openUpdateDrawModal = useOpenUpdateDrawModal(id);
  const openDeleteDrawModal = useOpenDeleteDrawModal(id);
  return (
    <Card className="card">
      {/* <Loader isLoading={isLoading} /> */}
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
          </>
        }
      />
      <CardContent>
        <div className="draw-card__content">
          <div className="draw-card__row">
            <span className="draw-card__name">Начало розыгрыша — </span>
            <span>{new Date(start).toLocaleDateString('ru')}</span>
          </div>
          <div className="draw-card__row">
            <span className="draw-card__name">Конец розыгрыша — </span>
            <span>{new Date(end).toLocaleDateString('ru')}</span>
          </div>
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
