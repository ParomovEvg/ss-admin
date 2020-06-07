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
import { useUpdateModalProps } from './UpdateDrawModal.fipc';
import { createFipc } from 'react-fipc';
import { Formik } from 'formik';
import { updateDrawModalValidSchema } from './UpdateDrawModalValidSchem';

export interface initialUpdateValuesType {
  sLimit: string;
  qrLimit: string;
  qrLimitPeriodMS: string;
}

type UpdateModalProps = {
  useUpdateModalProps: useUpdateModalProps;
  useInitialValues: () => initialUpdateValuesType;
  useCloseUpdateModal: () => () => void;
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
      validationSchema={updateDrawModalValidSchema}
      onSubmit={(values, action) => {
        updateFormHandler(values, action);
      }}
    >
      {(formik) => {
        return (
          <Modal
            open={updateModalState}
            onClose={closeUpdateModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div className="modal-wrapper modal-wrapper--big">
              <Grid item sm={12}>
                <Card>
                  <CardHeader
                    title="Изменить розыгрыш"
                    action={
                      <IconButton
                        onClick={() => closeUpdateModal()}
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
                            name="sLimit"
                            label="Минимальная сумма чека"
                            variant="outlined"
                            error={formik.errors.sLimit ? true : false}
                            helperText={formik.errors.sLimit}
                            value={formik.values.sLimit}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            fullWidth
                            name="qrLimit"
                            label="Максимальное количество qr-кодов в день"
                            variant="outlined"
                            error={formik.errors.qrLimit ? true : false}
                            helperText={formik.errors.qrLimit}
                            value={formik.values.qrLimit}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            fullWidth
                            name="qrLimitPeriodMS"
                            label="Время сброса дневного лимита (в часах)"
                            variant="outlined"
                            error={formik.errors.qrLimitPeriodMS ? true : false}
                            helperText={formik.errors.qrLimitPeriodMS}
                            value={formik.values.qrLimitPeriodMS}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid>
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

export const UpdateDrawModal$ = createFipc(UpdateModalComponent);
