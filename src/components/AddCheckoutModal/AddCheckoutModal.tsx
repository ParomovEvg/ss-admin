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
import { useAddCheckoutModalProps } from './AddCheckoutModal.fipc';
import { createFipc } from 'react-fipc';

type AddCheckoutModalProps = {
  useAddCheckoutModalProps: useAddCheckoutModalProps;
};

export const AddCheckoutModalComponent: React.FC<AddCheckoutModalProps> = ({
  useAddCheckoutModalProps,
}) => {
  const {
    closeAddCheckoutModal,
    addCheckoutAddress,
    addCheckoutFn,
    addCheckoutModalState,
    addCheckoutFormInputHandler,
    addCheckoutFormHandler,
  } = useAddCheckoutModalProps();
  return (
    <Modal
      open={addCheckoutModalState}
      onClose={() => closeAddCheckoutModal()}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modal-wrapper modal-wrapper--big">
        <Grid item sm={12}>
          <Card>
            <CardHeader
              title="Добавить новую кассу"
              action={
                <IconButton
                  onClick={() => closeAddCheckoutModal()}
                  aria-label="settings"
                >
                  <CloseIcon />
                </IconButton>
              }
            />
            <CardContent>
              <form onSubmit={addCheckoutFormHandler}>
                <Grid container spacing={2} direction={'column'}>
                  <Grid item>
                    <TextField
                      fullWidth
                      name="fn"
                      label="Номер кассы"
                      variant="outlined"
                      value={addCheckoutFn}
                      onChange={addCheckoutFormInputHandler}
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      name="address"
                      label="Адрес кассы"
                      variant="outlined"
                      value={addCheckoutAddress}
                      onChange={addCheckoutFormInputHandler}
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

export const AddCheckoutModal$ = createFipc(AddCheckoutModalComponent);
