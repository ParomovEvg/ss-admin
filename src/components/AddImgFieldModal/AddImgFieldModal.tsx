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
import { useAddImgFieldModalProps } from './AddImgFieldModal.fipc';
import { createFipc } from 'react-fipc';
type AddImgFieldModalProps = {
  id: number;
  useAddImgFieldModalProps: useAddImgFieldModalProps;
};

export const AddImgFieldModalComponent: React.FC<AddImgFieldModalProps> = ({
  id,
  useAddImgFieldModalProps,
}) => {
  const {
    addImgFieldFormHandler,
    addImgFieldFormInputHandler,
    addImgFieldModalState,
    addImgFieldName,
    closeAddImgFieldModal,
  } = useAddImgFieldModalProps(id);
  return (
    <Modal
      open={addImgFieldModalState}
      onClose={() => closeAddImgFieldModal()}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modal-wrapper modal-wrapper--big">
        <Grid item sm={12}>
          <Card>
            <CardHeader
              title="Добавить новое поле изображения"
              action={
                <IconButton
                  onClick={() => closeAddImgFieldModal()}
                  aria-label="settings"
                >
                  <CloseIcon />
                </IconButton>
              }
            />
            <CardContent>
              <form onSubmit={addImgFieldFormHandler}>
                <Grid container spacing={2} direction={'column'}>
                  <Grid item>
                    <TextField
                      fullWidth
                      name="name"
                      label="Имя поля"
                      variant="outlined"
                      value={addImgFieldName}
                      onChange={addImgFieldFormInputHandler}
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

export const AddImgFieldModal$ = createFipc(AddImgFieldModalComponent);
