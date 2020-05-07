import React, { useState } from 'react';
import MultiImageInput from 'react-multiple-image-input';
import { Layout } from '../../components/Layout/Layout';
import { Card, CardContent, Grid, CardHeader } from '@material-ui/core';
import { TextCard$ } from '../../components/TextCard/TextCard';
import { createUseTextFiled } from '../../components/TextCard/createUseText';
import { uniqueId } from 'lodash';

export interface HomeProps {
  className?: string;
}

const TitleTextCard = TextCard$({
  multiline: true,
  useTextField: createUseTextFiled(
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ id: uniqueId(), value: 'adafsfd' }), 3000)
      ),
    (baseText) =>
      new Promise((resolve) =>
        setTimeout(
          () => resolve({ id: uniqueId(), value: baseText.value + 'last' }),
          3000
        )
      ),
    (newText) =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({ id: uniqueId(), value: 'Сканируй qr код и выигрывай' }),
          3000
        )
      )
  ),
});

export const Home: React.FC<HomeProps> = ({ children, className }) => {
  const [state, useState] = React.useState<object[]>([]);
  return (
    <Layout title="Home">
      <Grid container spacing={3}>
        <Grid item sm={12}>
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
