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
import { useAddMarkdownFieldModalProps } from './AddMarkdownModal.fipc';
import { createFipc } from 'react-fipc';

type AddTextFieldModalProps = {
  id: number;
  useAddMarkdownFieldModalProps: useAddMarkdownFieldModalProps;
};

export const AddMarkdownModalComponent: React.FC<AddTextFieldModalProps> = ({
  id,
  useAddMarkdownFieldModalProps,
}) => {
  const {
    closeAddMarkdownFieldModal,
    addMarkdownFieldLabel,
    addMarkdownFieldName,
    AddMarkdownFieldModalState,
    addMarkdownFieldFormInputHandler,
    addMarkdownFieldFormHandler,
  } = useAddMarkdownFieldModalProps(id);
  return (
    <Modal
      open={AddMarkdownFieldModalState}
      onClose={() => closeAddMarkdownFieldModal()}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modal-wrapper modal-wrapper--big">
        <Grid item sm={12}>
          <Card className="modal-wrapper__card">
            <CardHeader
              title="Добавить новое поле markdown"
              action={
                <IconButton
                  onClick={() => closeAddMarkdownFieldModal()}
                  aria-label="settings"
                >
                  <CloseIcon />
                </IconButton>
              }
            />
            <CardContent>
              <form onSubmit={addMarkdownFieldFormHandler}>
                <Grid container spacing={2} direction={'column'}>
                  <Grid item>
                    <TextField
                      fullWidth
                      name="name"
                      label="Имя поля"
                      variant="outlined"
                      value={addMarkdownFieldName}
                      onChange={addMarkdownFieldFormInputHandler}
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      name="label"
                      label="Лейбел поля"
                      variant="outlined"
                      value={addMarkdownFieldLabel}
                      onChange={addMarkdownFieldFormInputHandler}
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

export const AddMarkdownModal$ = createFipc(AddMarkdownModalComponent);
