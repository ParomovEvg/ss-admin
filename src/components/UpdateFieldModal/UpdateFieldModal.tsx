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
import { useUpdateModalProps } from './UpdateFieldModal.fipc';
import { createFipc } from 'react-fipc';
import { Formik } from 'formik';
import { updateFieldModalValidSchema } from './UpdateFieldModalValidSchem';

export interface initialUpdateValuesType {
  name: string;
  description: string;
}

type UpdateModalProps = {
  useUpdateModalProps: useUpdateModalProps;
  useInitialValues: () => initialUpdateValuesType;
  useCloseUpdateModal: () => (resetForm: () => void) => void;
  useUpdateModalState: () => boolean;
};

export const UpdateModalComponent: React.FC<UpdateModalProps> = ({
  useUpdateModalProps,
  useInitialValues,
  useCloseUpdateModal,
  useUpdateModalState,
}) => {
  const { updateFormHandler } = useUpdateModalProps();
  const initialValues = useInitialValues();
  const closeUpdateModal = useCloseUpdateModal();
  const updateModalState = useUpdateModalState();
  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize={true}
      validationSchema={updateFieldModalValidSchema}
      onSubmit={(values, action) => {
        updateFormHandler(values, action);
      }}
    >
      {(formik) => {
        return (
          <Modal
            open={updateModalState}
            onClose={() => closeUpdateModal(formik.resetForm)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div className="modal-wrapper modal-wrapper--big">
              <Grid item sm={12}>
                <Card className="modal-wrapper__card">
                  <CardHeader
                    title="Изменить поле"
                    action={
                      <IconButton
                        onClick={() => closeUpdateModal(formik.resetForm)}
                        aria-label="settings"
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <form onSubmit={formik.handleSubmit}>
                      <Grid container spacing={2} direction={'column'}>
                        <Grid item>
                          <TextField
                            fullWidth
                            name="name"
                            label="Имя поля"
                            variant="outlined"
                            error={formik.errors.name ? true : false}
                            helperText={formik.errors.name}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            fullWidth
                            name="description"
                            label="Описание поля"
                            variant="outlined"
                            error={formik.errors.description ? true : false}
                            helperText={formik.errors.description}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item>
                          <Button
                            type="submit"
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
      }}
    </Formik>
  );
};

export const UpdateFieldModalComponent$ = createFipc(UpdateModalComponent);
