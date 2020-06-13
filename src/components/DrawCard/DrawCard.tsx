import React from 'react';
import { createFipc } from 'react-fipc';
import { Loader } from '../Loader/Loader';
import { DrawCardHooks } from './DrawCard.fipc';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './DrawCard.scss';
import { IconButton } from '@material-ui/core';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../redux/slices/viewSlice';
import CreateIcon from '@material-ui/icons/Create';
import { drawViewActions } from '../../redux/slices/draw/drawView';
export interface DrawCardProps extends DrawCardHooks {
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

export const DrawCardComponent: React.FC<DrawCardProps> = ({
  children,
  className,
  description,
  id,
  start,
  end,
  sLimit,
  qrLimit,
  qrLimitPeriodMS,
  useDraw,
  useOpenUpdateDrawModal,
}) => {
  const { isLoading } = useDraw(id);
  const openDeleteDrawModal = useAction(drawViewActions.openDeleteDrawModal);
  const openUpdateDrawModal = useOpenUpdateDrawModal(id);
  return (
    <>
      <Loader isLoading={isLoading} />
      <ExpansionPanel className="draw-card">
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <div className="draw-card__header">
            <h3 className="draw-card__title">{description}</h3>
            <div className="draw-card__date">
              <span>{new Date(start).toLocaleDateString('ru')}</span>
              <span>—</span>
              <span>{new Date(end).toLocaleDateString('ru')}</span>
            </div>
            <div className="draw-card__delete">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  openDeleteDrawModal(id);
                }}
                aria-label="settings"
              >
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={openUpdateDrawModal} aria-label="settings">
                <CreateIcon />
              </IconButton>
            </div>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
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
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

export const DrawCard$ = createFipc(DrawCardComponent);
