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
import { createFipc } from 'react-fipc';
import { useRenameScreenType } from './RenameScreenModal.fipc';

export type RenameScreenComponentProps = {
  id: number;
  useRenameScreen: useRenameScreenType;
};

export const RenameScreenModalComponent: React.FC<RenameScreenComponentProps> = ({
  id,
  useRenameScreen,
}) => {
  const {
    closeRenameScreenModal,
    renameScreenModalState,
    renameScreenName,
    renameScreenFormInputHandler,
    renameScreenFormHandler,
  } = useRenameScreen(id);
  return (
    <Modal
      open={renameScreenModalState}
      onClose={() => closeRenameScreenModal()}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modal-wrapper modal-wrapper--big">
        <Grid item sm={12}>
          <Card className="modal-wrapper__card">
            <CardHeader
              title="Изменить имя скрина"
              action={
                <IconButton
                  onClick={() => closeRenameScreenModal()}
                  aria-label="settings"
                >
                  <CloseIcon />
                </IconButton>
              }
            />
            <CardContent>
              <form onSubmit={renameScreenFormHandler}>
                <Grid container spacing={2} direction={'column'}>
                  <Grid item>
                    <TextField
                      fullWidth
                      name="name"
                      label="Имя поля"
                      variant="outlined"
                      value={renameScreenName}
                      onChange={renameScreenFormInputHandler}
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
                      изменить
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

export const RenameScreenModal$ = createFipc(RenameScreenModalComponent);
