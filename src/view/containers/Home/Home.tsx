import React, { useState } from 'react';
import MultiImageInput from 'react-multiple-image-input';
import { Layout } from '../../components/Layout/Layout';
import { Card, CardContent, Grid, CardHeader } from '@material-ui/core';
import { TextCard$ } from '../../components/TextCard/TextCard';
import { createUseTextFiled } from '../../components/TextCard/createUseText';
import { uniqueId } from 'lodash';
import { useParams } from 'react-router-dom';
import { createFipc } from 'react-fipc';

export interface ScreenProps extends ScreenHooks{
  className?: string;
}

export interface ScreenHooks {
	useFields: () => {
		name: string,
		id: number
	}[]
}


const Home: React.FC<ScreenProps> = ({ children, className, useFields }) => {
	
	const fields = useFields()

  const [state, useState] = React.useState<object[]>([]);
  return (
    <Layout title="Home">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Card>
            <CardHeader title={'Загруизть изображения'} />
            <CardContent>
							{fields.map(({name}) => {
								return <div>{name}</div>
							})}
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


export const Home$ = createFipc(Home)