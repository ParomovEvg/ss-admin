import React from 'react';
import { AddTextFieldModal } from '../AddTextFieldModal/AddTextFieldModal.fipc';
import { TextFieldType } from '../../redux/slices/textFieldsSlice';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../redux/slices/viewSlice';
import { Grid, Card, Button } from '@material-ui/core';
import { TextCard } from '../TextCard/textCard.fipc';
import { DeleteModalTextField } from '../deleteModal/deleteModalImgField';
import { createFipc } from 'react-fipc';

export interface TextFieldListComponentHooks {
  useTextFields: () => { textFields: TextFieldType[] };
}

export interface TextFieldListComponentProps
  extends TextFieldListComponentHooks {
  id: number;
}

export const TextFieldListComponent: React.FC<TextFieldListComponentProps> = ({
  useTextFields,
  id,
}) => {
  const { textFields } = useTextFields();
  const openAddTextFieldModal = useAction(viewActions.openAddTextFieldModal);
  return (
    <>
      <Grid container spacing={3}>
        {textFields.map(({ id, name, description }) => {
          return (
            <TextCard id={id} key={id} name={name} description={description} />
          );
        })}
        <AddTextFieldModal id={id} />
        <Grid item sm={4}>
          <Card className="AddCard">
            <Button onClick={() => openAddTextFieldModal()} color="primary">
              Добавить текстовое поле
            </Button>
          </Card>
        </Grid>
      </Grid>
      <DeleteModalTextField />
    </>
  );
};

export const TextFieldList$ = createFipc(TextFieldListComponent);
