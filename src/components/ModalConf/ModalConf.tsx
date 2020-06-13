import React, { useCallback } from 'react';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  Button,
} from '@material-ui/core';
import { createFipc } from 'react-fipc';
import './Modal.scss';

interface ModalConfProps {
  useHandlerClick: () => (payload: number) => any;
  useDeleteModalClose: () => () => void;
  useIsDeleteModal: () => boolean;
  useBtnRightText: () => string;
  useBtnLeftText: () => string;
  useTitle: () => string;
  useGetId: () => number;
}

export const ModalConf: React.FC<ModalConfProps> = ({
  useHandlerClick,
  useDeleteModalClose,
  useBtnRightText,
  useBtnLeftText,
  useTitle,
  useIsDeleteModal,
  useGetId,
}) => {
  const title = useTitle();
  const btnRightText = useBtnRightText();
  const btnLeftText = useBtnLeftText();
  const status = useIsDeleteModal();
  const closeModal = useDeleteModalClose();
  const handlerClick = useHandlerClick();
  const id = useGetId();

  const handler = useCallback(() => {
    closeModal();
    handlerClick(id);
  }, [closeModal, handlerClick, id]);

  return (
    <Modal
      open={status}
      onClose={() => closeModal()}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modal-wrapper">
        <Card className="modal-wrapper__card">
          <CardHeader title={title} />
          <CardContent>
            <Button
              onClick={handler}
              variant={'contained'}
              color={'primary'}
              classes={{
                root: 'mr20',
              }}
            >
              {btnLeftText}
            </Button>
            <Button
              onClick={() => closeModal()}
              variant={'outlined'}
              color={'primary'}
            >
              {btnRightText}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Modal>
  );
};

export const ModalConf$ = createFipc(ModalConf);
