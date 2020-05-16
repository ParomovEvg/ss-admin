import React from 'react';
import MultiImageInput from 'react-multiple-image-input';
import { Layout } from '../Layout/Layout';
import {
  Card,
  CardContent,
  Grid,
  CardHeader,
  CircularProgress,
  IconButton,
  Modal,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import { TextCard } from '../TextCard/textCard.fipc';
import { createFipc } from 'react-fipc';
import { fieldsType } from '../../redux/slices/fieldsSlice';
import Button from '@material-ui/core/Button';
import './Home.scss';
import { DeleteModalField } from '../Template/deleteModal/deleteModalField';
export interface ScreenProps extends ScreenHooks {
  className?: string;
}

export interface ScreenHooks {
  useFields: () => [fieldsType, string];
  useAddField: () => [() => void, boolean];
}

const HomeComponent: React.FC<ScreenProps> = ({
  children,
  className,
  useFields,
  useAddField,
}) => {
  const [fields, status] = useFields();
  const [toggleAddFieldModal, addFieldModalState] = useAddField();
  const [state, useState] = React.useState<object[]>([]);
  return (
    <Layout title="Home">
      <Grid container spacing={3}>
        {status === 'loading' && (
          <div className="TextCard__loader-wrapper">
            <CircularProgress />
          </div>
        )}
        {fields.map(({ id, name }) => {
          return <TextCard id={id} key={id} name={name} />;
        })}
        {/*onClick={addFieldModal}*/}
        <Grid item sm={4}>
          <div className="add-card">
            <Button
              onClick={toggleAddFieldModal}
              variant="contained"
              color="primary"
            >
              Добавить текстовое поле
            </Button>
          </div>
        </Grid>
        <Modal
          open={addFieldModalState}
          onClose={toggleAddFieldModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="modal-wrapper">
            <p>Вы точно хотите удалить это поле?</p>
            <Button
              // onClick={deleteFieldHandler}
              variant={'contained'}
              color={'primary'}
            >
              Удалить
            </Button>
          </div>
        </Modal>
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
      </Grid>
      <DeleteModalField />
    </Layout>
  );
};

export const Home$ = createFipc(HomeComponent);
