import {
  Modal,
  Grid,
  Card,
  CardHeader,
  IconButton,
  CardContent,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { useInfoMarkdownModalProps } from './markdownInfoModal.fipc';
import { createFipc } from 'react-fipc';

type infoMarkdownModalProps = {
  useInfoMarkdownModal: useInfoMarkdownModalProps;
};

export const InfoMarkdownModalComponent: React.FC<infoMarkdownModalProps> = ({
  useInfoMarkdownModal,
}) => {
  const {
    closeInfoMarkdownModal,
    infoMarkdownModalState,
  } = useInfoMarkdownModal();
  return (
    <Modal
      open={infoMarkdownModalState}
      onClose={closeInfoMarkdownModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modal-wrapper modal-wrapper--big">
        <Grid item sm={12}>
          <Card className="modal-wrapper__card">
            <CardHeader
              title="Описание текстового поля"
              action={
                <IconButton
                  onClick={() => closeInfoMarkdownModal()}
                  aria-label="settings"
                >
                  <CloseIcon />
                </IconButton>
              }
            />
            <CardContent>
              <p>
                <strong>#</strong> - Заголовок первого уровня
              </p>
              <p>
                <strong>##</strong> - Заголовок второго уровня
              </p>
              <p>
                <strong>###</strong> - Заголовок третьего уровня
              </p>
              <p>
                <strong>[имя ссылки](ссылка)</strong> - Ссылка
              </p>
              <p>
                <strong>{'{имя картинки}'}(ссылка на картинку)</strong> -
                Картинка
              </p>
            </CardContent>
          </Card>
        </Grid>
      </div>
    </Modal>
  );
};

export const InfoMarkdownModal$ = createFipc(InfoMarkdownModalComponent);
