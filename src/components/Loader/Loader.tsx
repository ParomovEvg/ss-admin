import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { createFipc } from 'react-fipc';
import './Loader.scss';
export interface LoaderProps {
  isLoading: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="loader-wrapper">
      <CircularProgress />
    </div>
  );
};

export const Loader$ = createFipc(Loader);
