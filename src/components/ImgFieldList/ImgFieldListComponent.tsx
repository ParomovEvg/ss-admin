import React from 'react';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../redux/slices/viewSlice';
import { Grid, Card, Button } from '@material-ui/core';
import { createFipc } from 'react-fipc';
import { ImgFieldDto } from '../../apiWorker/typings';
import { ImgCard } from '../ImgCard/ImgCard.fipc';
import { AddImgFieldModal } from '../AddImgFieldModal/AddImgFieldModal.fipc';
import { DeleteModalImgField } from '../deleteModal/deleteModalTextField';
import { UpdateImgFieldModal } from '../UpdateFieldModal/UpdateImgFieldModal.fipc';

export interface ImgFieldListComponentHooks {
  useImgFields: () => {
    imgFields: ImgFieldDto[];
  };
}

export interface ImgFieldListComponentProps extends ImgFieldListComponentHooks {
  id: number;
}

export const ImgFieldListComponent: React.FC<ImgFieldListComponentProps> = ({
  useImgFields,
  id,
}) => {
  const { imgFields } = useImgFields();
  const openAddImgFieldModal = useAction(viewActions.openAddImgFieldModal);
  return (
    <>
      <Grid container spacing={3}>
        {imgFields.map(({ id, name, img, description }) => {
          return (
            <ImgCard id={id} key={id} name={name} description={description} />
          );
        })}
        <AddImgFieldModal id={id} />
        <Grid item sm={4}>
          <Card className="AddCard">
            <Button onClick={() => openAddImgFieldModal()} color="primary">
              Добавить поле изображения
            </Button>
          </Card>
        </Grid>
      </Grid>
      <UpdateImgFieldModal />
      <DeleteModalImgField />
    </>
  );
};

export const ImgFieldList$ = createFipc(ImgFieldListComponent);
