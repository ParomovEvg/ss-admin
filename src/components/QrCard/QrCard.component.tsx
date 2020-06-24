import { createFipc } from 'react-fipc';
import React from 'react';

import { QrCardHooks } from './QrCard.fipc';
import { qrType } from '../../redux/slices/qr/qrList.slice';
import './QrCard.scss';

export interface QrCardComponentProps extends QrCardHooks {
  children?: any;
  qr: qrType;
}

const QrCardComponent: React.FC<QrCardComponentProps> = ({ qr }) => {
  return (
    <div className="qr-card">
      <div className="qr-card__row">
        <div className="qr-card__col">
          <div className="qr-card__name">Описание розыгрыша:</div>
        </div>
        <div className="qr-card__col">
          <div className="qr-card__value">{qr.draw.description}</div>
        </div>
      </div>
      <div className="qr-card__row">
        <div className="qr-card__col">
          <div className="qr-card__name">Касса №:</div>
        </div>
        <div className="qr-card__col">
          <div className="qr-card__value">{qr.checkout.fn}</div>
        </div>
      </div>
      <div className="qr-card__row">
        <div className="qr-card__col">
          <div className="qr-card__name">Телефон:</div>
        </div>
        <div className="qr-card__col">
          <div className="qr-card__value">{qr.phone.phone}</div>
        </div>
      </div>
      <div className="qr-card__row">
        <div className="qr-card__col">
          <div className="qr-card__name">Сумма:</div>
        </div>
        <div className="qr-card__col">
          <div className="qr-card__value">{qr.s} ₽</div>
        </div>
      </div>
      <div className="qr-card__row">
        <div className="qr-card__col">
          <div className="qr-card__name">fd:</div>
        </div>
        <div className="qr-card__col">
          <div className="qr-card__value">{qr.fd}</div>
        </div>
      </div>
      <div className="qr-card__row">
        <div className="qr-card__col">
          <div className="qr-card__name">fp:</div>
        </div>
        <div className="qr-card__col">
          <div className="qr-card__value">{qr.fp}</div>
        </div>
      </div>
    </div>
  );
};

export const QrCard$ = createFipc(QrCardComponent);
