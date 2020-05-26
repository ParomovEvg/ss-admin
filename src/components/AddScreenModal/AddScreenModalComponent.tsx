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
import { useAddScreenModalProps } from './AddScreenModal.fipc';
import { createFipc } from 'react-fipc';
type AddScreenModalComponentProps = {
  useAddScreenModalProps: useAddScreenModalProps;
};

export const AddScreenModalComponent: React.FC<AddScreenModalComponentProps> = ({
  useAddScreenModalProps,
}) => {
  const {
    closeAddScreenModal,
    AddScreenModalState,
    addScreenName,
    addScreenFormInputHandler,
    addScreenFormHandler,
  } = useAddScreenModalProps();
  return (
    <Modal
      open={AddScreenModalState}
      onClose={() => closeAddScreenModal()}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modal-wrapper modal-wrapper--big">
        <Grid item sm={12}>
          <Card>
            <CardHeader
              title="Добавить новый экран"
              action={
                <IconButton
                  onClick={() => closeAddScreenModal()}
                  aria-label="settings"
                >
                  <CloseIcon />
                </IconButton>
              }
            />
            <CardContent>
              <form onSubmit={addScreenFormHandler}>
                <Grid container spacing={2} direction={'column'}>
                  <Grid item>
                    <TextField
                      fullWidth
                      name="name"
                      label="Имя скрина"
                      variant="outlined"
                      value={addScreenName}
                      onChange={addScreenFormInputHandler}
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

export const AddScreenModal$ = createFipc(AddScreenModalComponent);
