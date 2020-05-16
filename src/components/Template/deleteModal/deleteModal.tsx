import { Modal, Button } from '@material-ui/core';
import React, { useCallback } from 'react';
import { createFipc } from 'react-fipc';

interface DeleteModalProps {
  useDeleteAction: () => (payload: number) => void;
  useDeleteModalToggle: () => () => void;
  useIsDeleteModal: () => boolean;
  text: string;
  useGetId: () => number;
}

export const useDeleteModal: React.FC<DeleteModalProps> = ({
  useDeleteAction,
  useDeleteModalToggle,
  text,
  useIsDeleteModal,
  useGetId,
}) => {
  const id = useGetId();
  const status = useIsDeleteModal();
  const changeStatus = useDeleteModalToggle();
  const deleteAction = useDeleteAction();

  const handleDelete = useCallback(() => {
    changeStatus();
    deleteAction(id);
  }, [changeStatus, deleteAction, id]);

  return (
    <Modal
      open={status}
      onClose={() => changeStatus()}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modal-wrapper">
        <p>{text}</p>
        <Button onClick={handleDelete} variant={'contained'} color={'primary'}>
          Удалить
        </Button>
      </div>
    </Modal>
  );
};

export const useDeleteModal$ = createFipc(useDeleteModal);
