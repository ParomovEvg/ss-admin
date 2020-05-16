import React from 'react';
import MultiImageInput from 'react-multiple-image-input';
import { Layout } from '../Layout/Layout';
import {
  Card,
  CardContent,
  Grid,
  CardHeader,
  CircularProgress,
} from '@material-ui/core';
import { TextCard } from '../TextCard/textCard.fipc';
import { createFipc } from 'react-fipc';
import { fieldsType } from '../../redux/slices/fieldsSlice';

export interface ScreenProps extends ScreenHooks {
  className?: string;
}

export interface ScreenHooks {
  useFields: () => [fieldsType, string];
}

const HomeComponent: React.FC<ScreenProps> = ({
  children,
  className,
  useFields,
}) => {
  const [fields, status] = useFields();
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
        <Grid item sm={12}>
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
        </Grid>
      </Grid>
    </Layout>
  );
};

export const Home$ = createFipc(HomeComponent);
