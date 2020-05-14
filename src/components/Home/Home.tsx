import React from 'react';
import MultiImageInput from 'react-multiple-image-input';
import { Layout } from '../Layout/Layout';
import { Card, CardContent, Grid, CardHeader } from '@material-ui/core';
import { TextCard } from '../TextCard/textCard.fipc';
import { createFipc } from 'react-fipc';
import { fieldsType } from '../../redux/slices/fieldsSlice';

export interface ScreenProps extends ScreenHooks {
  className?: string;
}

export interface ScreenHooks {
  useFields: () => fieldsType;
}

const HomeComponent: React.FC<ScreenProps> = ({
  children,
  className,
  useFields,
}) => {
  const fields = useFields();

  const [state, useState] = React.useState<object[]>([]);
  return (
    <Layout title="Home">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          {fields.map(({ id, name }) => {
            return <TextCard id={id} name={name} />;
          })}
          <Card>
            <CardHeader title={'Загруизть изображения'} />
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
