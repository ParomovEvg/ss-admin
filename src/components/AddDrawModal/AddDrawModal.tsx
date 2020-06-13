import {
  Modal,
  Grid,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { useAddDrawModalProps } from './AddDrawModal.fipc';
import { createFipc } from 'react-fipc';
import { Formik } from 'formik';
import { addDrawModalValidSchema } from './addDrawModalValidSchem';

export interface initialValuesType {
  start: string;
  end: string;
  description: string;
  sLimit: string;
  qrLimit: string;
  qrLimitPeriodMS: string;
  isNextDraw: boolean;
}

type AddDrawModalProps = {
  useAddDrawModalProps: useAddDrawModalProps;
  useInitialValues: () => initialValuesType;
  useNextDrawTime: () => {
    isLastDraw: boolean;
    lastDrawTimeFormat: string;
  };
};

export const AddDrawModalComponent: React.FC<AddDrawModalProps> = ({
  useAddDrawModalProps,
  useInitialValues,
  useNextDrawTime,
}) => {
  const {
    addDrawFormHandler,
    addDrawModalState,
    closeAddDrawModal,
  } = useAddDrawModalProps();
  const initialValues = useInitialValues();
  const { isLastDraw, lastDrawTimeFormat } = useNextDrawTime();
  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={addDrawModalValidSchema}
      onSubmit={(values, action) => {
        addDrawFormHandler(values, action);
      }}
    >
      {(formik) => {
        return (
          <Modal
            open={addDrawModalState}
            onClose={closeAddDrawModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div className="modal-wrapper modal-wrapper--big">
              <Grid item sm={12}>
                <Card className="modal-wrapper__card">
                  <CardHeader
                    title="Добавить новый розыгрыш"
                    action={
                      <IconButton
                        onClick={() => closeAddDrawModal()}
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
                            name="start"
                            label="Начало розыгрыша"
                            variant="outlined"
                            type="date"
                            error={formik.errors.start ? true : false}
                            helperText={formik.errors.start}
                            value={
                              formik.values.isNextDraw
                                ? lastDrawTimeFormat
                                : formik.values.start
                            }
                            disabled={formik.values.isNextDraw ? true : false}
                            onChange={formik.handleChange}
                          />
                          <Grid item>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  inputProps={{
                                    'aria-label': 'uncontrolled-checkbox',
                                  }}
                                  name="isNextDraw"
                                  onChange={formik.handleChange}
                                  value={formik.values.isNextDraw}
                                  disabled={!isLastDraw}
                                />
                              }
                              label="Начать с последнего розыгрыша"
                            />
                          </Grid>
                        </Grid>

                        <Grid item>
                          <TextField
                            fullWidth
                            name="end"
                            label="Конец розыгрыша"
                            variant="outlined"
                            type="date"
                            error={formik.errors.end ? true : false}
                            helperText={formik.errors.end}
                            value={formik.values.end}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            fullWidth
                            name="description"
                            label="Описание"
                            variant="outlined"
                            error={formik.errors.description ? true : false}
                            helperText={formik.errors.description}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                          />
                        </Grid>
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
      }}
    </Formik>
  );
};

export const AddDrawModal$ = createFipc(AddDrawModalComponent);
