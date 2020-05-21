import React from 'react';
import { Layout } from '../Layout/Layout';
import { Card, Grid, TextField } from '@material-ui/core';
import { TextCard } from '../TextCard/textCard.fipc';
import { createFipc } from 'react-fipc';
import { TextFieldType } from '../../redux/slices/textFieldsSlice';
import Button from '@material-ui/core/Button';
import { Loader } from '../Loader/Loader';
import { DeleteModalImgField } from '../deleteModal/deleteModalTextField';
import './Screen.scss';
import { ImgFieldDto } from '../../apiWorker/typings';
import { ImgCard } from '../ImgCard/ImgCard.fipc';
import { DeleteModalTextField } from '../deleteModal/deleteModalImgField';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../redux/slices/viewSlice';
import { AddTextFieldModal } from '../AddTextFieldModal/AddTextFieldModal.fipc';
import { useParams } from 'react-router-dom';
import { AddImgFieldModal } from '../AddImgFieldModal/AddImgFieldModal.fipc';
export interface ScreenProps extends ScreenHooks {
  className?: string;
}

export interface ScreenHooks {
  useFields: () => void;
  useTextFields: () => { textFields: TextFieldType[] };
  useIsLoading: () => {
    isLoading: boolean;
  };
  useImgFields: () => {
    imgFields: ImgFieldDto[];
  };
}

const Screen: React.FC<ScreenProps> = ({
  children,
  className,
  useTextFields,
  useIsLoading,
  useImgFields,
  useFields,
}) => {
  const { id } = useParams<{ id: string }>();
  const { textFields } = useTextFields();
  const { isLoading } = useIsLoading();
  const { imgFields } = useImgFields();
  const openAddTextFieldModal = useAction(viewActions.openAddTextFieldModal);
  const openAddImgFieldModal = useAction(viewActions.openAddImgFieldModal);
  useFields();
  if (isLoading) return <Loader isLoading={isLoading} />;
  return (
    <Layout title="Home">
      <Grid container spacing={3}>
        {textFields.map(({ id, name }) => {
          return <TextCard id={id} key={id} name={name} />;
        })}
        <AddTextFieldModal id={parseInt(id)} />
        <Grid item sm={4}>
          <Card className="AddCard">
            <Button onClick={() => openAddTextFieldModal()} color="primary">
              Добавить текстовое поле
            </Button>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {imgFields.map(({ id, name }) => {
          return <ImgCard id={id} key={id} name={name} />;
        })}
        <AddImgFieldModal id={parseInt(id)} />
        <Grid item sm={4}>
          <Card className="AddCard">
            <Button onClick={() => openAddImgFieldModal()} color="primary">
              Добавить поле изображения
            </Button>
          </Card>
        </Grid>
      </Grid>

      <DeleteModalImgField />
      <DeleteModalTextField />
    </Layout>
  );
};

export const Screen$ = createFipc(Screen);
