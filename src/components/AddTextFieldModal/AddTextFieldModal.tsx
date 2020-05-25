import {
  Modal,
  Grid,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  TextField,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { useAddTextFieldModalProps } from './AddTextFieldModal.fipc';
import { createFipc } from 'react-fipc';
type AddTextFieldModalProps = {
  id: number;
  useAddTextFieldModalProps: useAddTextFieldModalProps;
};

export const AddTextFieldModalComponent: React.FC<AddTextFieldModalProps> = ({
  id,
  useAddTextFieldModalProps,
}) => {
  const {
    closeAddTextFieldModal,
    addTextFieldValue,
    addTextFieldName,
    addTextFieldModalState,
    addTextFieldFormInputHandler,
    addTextFieldFormHandler,
  } = useAddTextFieldModalProps(id);
  return (
    <Modal
      open={addTextFieldModalState}
      onClose={() => closeAddTextFieldModal()}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modal-wrapper modal-wrapper--big">
        <Grid item sm={12}>
          <Card>
            <CardHeader
              title="Добавить новое текстовое поле"
              action={
                <IconButton
                  onClick={() => closeAddTextFieldModal()}
                  aria-label="settings"
                >
                  <CloseIcon />
                </IconButton>
              }
            />
            <CardContent>
              <form onSubmit={addTextFieldFormHandler}>
                <Grid container spacing={2} direction={'column'}>
                  <Grid item>
                    <TextField
                      fullWidth
                      name="name"
                      label="Имя поля"
                      variant="outlined"
                      value={addTextFieldName}
                      onChange={addTextFieldFormInputHandler}
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      name="value"
                      label="Начальное значение"
                      variant="outlined"
                      value={addTextFieldValue}
                      onChange={addTextFieldFormInputHandler}
                      required
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
  );
};

export const AddTextFieldModal$ = createFipc(AddTextFieldModalComponent);
