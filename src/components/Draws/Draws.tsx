import React from 'react';
import { Layout } from '../Layout/Layout';

export interface DrawsProps {
  className?: string;
}

export const Draws: React.FC<DrawsProps> = ({ children, className }) => {
  return <Layout title="Розыгрыши">Розыгрыши</Layout>;
};
