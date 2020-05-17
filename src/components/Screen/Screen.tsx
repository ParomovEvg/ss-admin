import React, { useCallback } from 'react';
import MultiImageInput from 'react-multiple-image-input';
import { Layout } from '../Layout/Layout';
import {
  Card,
  CardContent,
  Grid,
  CardHeader,
  CircularProgress,
  // IconButton,
  Modal,
  IconButton,
  TextField,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import { TextCard } from '../TextCard/textCard.fipc';
import { createFipc } from 'react-fipc';
import { FieldType } from '../../redux/slices/fieldsSlice';
import Button from '@material-ui/core/Button';
import { Loader } from '../Loader/Loader';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../redux/slices/viewSlice';
import { DeleteModalField } from '../deleteModal/deleteModalField';
import CloseIcon from '@material-ui/icons/Close';
import './Screen.scss';
export interface ScreenProps extends ScreenHooks {
  className?: string;
}

export interface ScreenHooks {
  useFields: () => { fields: FieldType[]; isLoading: boolean };
  useAddField: () => {
    addFieldName: string;
    addFieldValue: string;
    addFieldFormInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    addFieldFormHandler: (e: React.FormEvent<Element>) => void;
  };
  useAddFieldModa: () => {
    closeAddFieldModal: () => void;
    openAddFieldModal: () => void;
    AddFieldModalState: boolean;
  };
}

const Screen: React.FC<ScreenProps> = ({
  children,
  className,
  useFields,
  useAddField,
  useAddFieldModa,
}) => {
  const { fields, isLoading } = useFields();
  const {
    addFieldName,
    addFieldValue,
    addFieldFormInputHandler,
    addFieldFormHandler,
  } = useAddField();
  const {
    AddFieldModalState,
    closeAddFieldModal,
    openAddFieldModal,
  } = useAddFieldModa();
  // const [state, useState] = React.useState<object[]>([]);

  return (
    <Layout title="Home">
      <Grid container spacing={3}>
        {fields.map(({ id, name }) => {
          return <TextCard id={id} key={id} name={name} />;
        })}
        {/* <Grid item sm={12}>
          <Card>
            <CardHeader title={'Загрузить изображения'} />
            <CardContent>
              <MultiImageInput
                max={1}
                allowCrop={false}
                theme="light"
                images={state}
                setImages={useState}
              />
            </CardContent>
          </Card>
        </Grid> */}
        <Modal
          open={AddFieldModalState}
          onClose={() => closeAddFieldModal()}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="modal-wrapper modal-wrapper--big">
            <Grid item sm={12}>
              <Card>
                <CardHeader
                  title="Добавить новое поле"
                  action={
                    <IconButton
                      onClick={() => closeAddFieldModal()}
                      aria-label="settings"
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <form onSubmit={addFieldFormHandler}>
                    <Grid container spacing={2} direction={'column'}>
                      <Grid item>
                        <TextField
                          fullWidth
                          name="name"
                          label="Имя поля"
                          variant="outlined"
                          value={addFieldName}
                          onChange={addFieldFormInputHandler}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          fullWidth
                          name="value"
                          label="Начальное значение"
                          variant="outlined"
                          value={addFieldValue}
                          onChange={addFieldFormInputHandler}
                        />
                      </Grid>
                      <Grid>
                        <Button
                          type={'submit'}
                          fullWidth
                          color={'primary'}
                          variant={'contained'}
                        >
                          создать
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </div>
        </Modal>
        {!isLoading && (
          <Grid item sm={4}>
            <Card className="AddCard">
              <Button onClick={() => openAddFieldModal()} color="primary">
                Добавить текстовое поле
              </Button>
            </Card>
          </Grid>
        )}
      </Grid>
      <Loader isLoading={isLoading} />
      <DeleteModalField />
    </Layout>
  );
};

export const Screen$ = createFipc(Screen);
