import React from 'react';
import { Layout } from '../Layout/Layout';
import { createFipc } from 'react-fipc';
import { Loader } from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import { TextFieldList } from '../TextFieldList/TextFieldList.fipc';
import { ImgFieldList } from '../ImgFieldList/ImgFieldList.fipc';
import { MarkdownFieldList } from '../MarkdownFieldList/MarkdownFieldList.fipc';
import './Screen.scss';
export interface ScreenHooks {
  useFields: () => void;
  useIsLoading: () => {
    isLoading: boolean;
  };
}

export interface ScreenProps extends ScreenHooks {
  className?: string;
}

const Screen: React.FC<ScreenProps> = ({
  children,
  className,
  useIsLoading,
  useFields,
}) => {
  const { id } = useParams<{ id: string }>();
  const { isLoading } = useIsLoading();
  //? dowload fields
  useFields();
  return (
    <Layout title="Home">
      <Loader isLoading={isLoading} />
      <TextFieldList id={id} />
      <ImgFieldList id={id} />
      <MarkdownFieldList id={id} />
    </Layout>
  );
};

export const Screen$ = createFipc(Screen);
